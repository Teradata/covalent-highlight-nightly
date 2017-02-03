package charts

import (
	"bufio"
	"bytes"
	"io/ioutil"
	"os"

	log "github.com/Sirupsen/logrus"
	"github.com/ghodss/yaml"
)

func parseFile(dir, fileName string) []byte {
	f, err := os.Open(dir + "/" + fileName)
	if err != nil {
		log.Error("Could not import schema: ", err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	parsedFile := []byte{}

	// read each line
	for scanner.Scan() {

		// replace any tabs with spaces, because YAML does NOT like tabs
		parsedLine := scanner.Bytes()
		parsedLine = bytes.Replace(parsedLine, []byte{9}, []byte(" "), -1)
		parsedLine = append(parsedLine, byte(10))
		parsedFile = append(parsedFile, parsedLine...)
	}

	return parsedFile
}

func importChart(dir, fileName string) []byte {

	chart := []byte{}
	_, err := os.Stat(dir + "/" + fileName)
	if err != nil {
		log.Error(fileName, ": filename does not exist. no default data has been seeded.")
		return chart
	}

	chart = parseFile(dir, fileName)
	return chart
}

func SeedCharts(dir string) {
	log.Info("Importing schemas for charts...")
	files, _ := ioutil.ReadDir(dir)
	for _, file := range files {
		template := importChart(dir, file.Name())

		m, err := unmarshalYaml(template)
		if err != nil {
			log.Error("Could not unmarshal Yaml ", file.Name(), ": ", err)
			continue
		}

		createChart(m)
	}

	return
}

func createChart(c map[string]interface{}) {
	log.Info("Executing Create New Chart")

	// create new chart
	// TODO: check all hashes to make sure they exist
	s := NewSet(c["name"].(string), c["key"].(string), int(c["length"].(float64)), int(c["interval_seconds"].(float64)))
	if s == nil {
		log.Error("Malformed request: Length or Interval")
		return
	}
	// add y axes
	for _, y := range c["y_axes"].([]interface{}) {
		yaxis := y.(map[string]interface{})
		f := yaxis["function_type"].(string)
		n := yaxis["name"].(string)
		err := s.AddYAxis(n, Functions[f])
		if err != nil {
			return
		}
	}

	// start it
	s.Run(c["x_axis_name"].(string), c["x_axis_format"].(string))
	log.Info("Created chart ", c["name"].(string), " at endpoint /charts/", c["key"].(string))
}

func unmarshalYaml(b []byte) (map[string]interface{}, error) {
	s := new(map[string]interface{})
	err := yaml.Unmarshal(b, &s)
	if err != nil {
		return nil, err
	}
	return *s, nil
}
