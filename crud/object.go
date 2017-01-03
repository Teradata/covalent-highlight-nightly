package crud

import (
	"bytes"
	"fmt"
	"math/rand"

	log "github.com/Sirupsen/logrus"
	"github.com/ghodss/yaml"
)

type Object struct {
	Name        string
	Yaml        map[string]interface{}
	RawTemplate Template
	IndexCol    string
	NumSeeds    int
	Randomize   bool
	DataOrder   []int
	DataMap     []map[string]interface{}
}

func NewObject(rawTemplate []byte, name string) *Object {
	// always create the same seed so that the initial seed data is always the same
	rand.Seed(0)
	o := new(Object)
	o.Name = name
	o.RawTemplate = rawTemplate
	return o
}

func (o *Object) CreateDataMap(datum *map[string][]string) {
	for _, dataOrder := range o.DataOrder {
		newMap := map[string]interface{}{}
		for keyword, values := range *datum {
			newMap[keyword] = values[dataOrder%len(values)]
		}
		o.DataMap = append(o.DataMap, newMap)
	}
}

func (o *Object) GetSeedProperties() error {
	if len(o.RawTemplate) == 0 {
		log.Info("Encountered an embedded template. Skipping.")
		return fmt.Errorf("no template")
	}

	// replace curly braces a unique string nothing because yaml
	b := bytes.Replace(o.RawTemplate, []byte("{{"), []byte("QwErT"), -1)
	b = bytes.Replace(b, []byte("}}"), []byte("TrEwQ"), -1)

	s, err := unmarshalYaml(b)
	if err != nil {
		log.Error("GetSeedProperties: yaml unmarshalling error: ", err.Error())
		return err
	}

	// see if there is an index column specified, or just use "id"
	o.IndexCol = "id"
	if i, ok := s["search_index"].(string); ok {
		o.IndexCol = i
	}
	indices[o.Name] = []string{o.IndexCol}

	// check to see how many seed items to create, if not specified create one
	o.NumSeeds = 1
	if i, ok := s["initial_entries"].(float64); ok {
		o.NumSeeds = int(i)
	}

	// check if data should be randomized, if not specified, randomize all the things
	o.Randomize = true
	if i, ok := s["randomize"].(bool); ok {
		o.Randomize = i
	}

	// create an array of unique integer permutations so we dont repeat random data
	if o.Randomize {
		o.DataOrder = rand.Perm(o.NumSeeds)
	} else {
		for i := 0; i < o.NumSeeds; i++ {
			o.DataOrder = append(o.DataOrder, i)
		}
	}

	// dete metadata about objects and re-marshal
	delete(s, "search_index")
	delete(s, "initial_entries")
	delete(s, "randomize")
	o.RawTemplate, err = yaml.Marshal(s)

	// replace unique string with curly braces
	o.RawTemplate = bytes.Replace(o.RawTemplate, []byte("QwErT"), []byte("{{"), -1)
	o.RawTemplate = bytes.Replace(o.RawTemplate, []byte("TrEwQ"), []byte("}}"), -1)
	if err != nil {
		log.Error("GetSeedProperties: yaml marshalling error: ", err.Error())
		return err
	}

	return nil
}

func unmarshalYaml(b []byte) (map[string]interface{}, error) {
	s := new(map[string]interface{})
	err := yaml.Unmarshal(b, &s)
	if err != nil {
		return nil, err
	}
	return *s, nil
}
