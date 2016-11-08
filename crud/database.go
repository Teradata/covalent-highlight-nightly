package crud

import (
	"bufio"
	"encoding/json"
	"io/ioutil"
	"math/rand"
	"os"
	"strings"

	"github.com/HouzuoGuo/tiedot/db"
	log "github.com/Sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

var DB *db.DB
var indices = map[string][]string{}

func ImportSchemas(schemaDir string, datumDir string) []string {

	_, dErr := os.Stat(datumDir)
	_, sErr := os.Stat(schemaDir)
	if dErr != nil || sErr != nil {
		log.Error("schema and/or datum directory does not exist. no default data has been seeded.")
		return []string{}
	}

	files, err := ioutil.ReadDir(schemaDir)
	if err != nil {
		log.Error("could not read schema dir. no default data has been seeded.")
		return []string{}
	}

	DBDir := os.TempDir() + "atomic-data"
	os.RemoveAll(DBDir)
	defer os.RemoveAll(DBDir)

	// (Create if not exist) open a database
	DB, err = db.OpenDB(DBDir)
	if err != nil {
		log.Fatal("could not write data to temp dir. Exiting.")
		return []string{}
	}

	for _, file := range files {
		var s map[string]interface{}

		log.Info("Importing schema from ", file.Name())
		f, err := ioutil.ReadFile(schemaDir + "/" + file.Name())
		if err != nil {
			log.Error("Could not import schema: ", err)
		}
		key := strings.Split(file.Name(), ".")[0]
		if err := DB.Create(key); err != nil {
			log.Error("Issue creating database for ", key, ": ", err)
			continue
		}

		err = yaml.Unmarshal([]byte(f), &s)
		if err != nil {
			log.Error("yaml parsing error for ", file.Name(), ": ", err.Error())
			continue
		}

		// see if there is an index column specified, or just use "id"
		index := "id"
		if i, ok := s["search_index"].(string); ok {
			index = i
		}
		indices[key] = []string{index}
		delete(s, "search_index")

		// check to see how many seed items to create, if not specified create one
		numSeeds := 1
		if i, ok := s["initial_entries"].(int); ok {
			numSeeds = i
		}
		delete(s, "initial_entries")

		// check if data should be randomized, if not specified, randomize all the things
		randomize := true
		if i, ok := s["randomize"].(bool); ok {
			randomize = i
		}
		delete(s, "randomize")

		log.Info(`Seeding initial collection "`, key, `" with `, numSeeds, ` entries`)
		log.Info("Seed datum randomization: ", randomize)
		err = SeedData(s, key, datumDir, numSeeds, randomize)
		if err != nil {
			log.Error("Could not seed data: ", err)
			return []string{}
		}
	}

	routes := []string{}
	for _, name := range DB.AllCols() {
		routes = append(routes, name)

		// add endpoint handlers for all collections
		log.Info(`Endpoint handler registered for "`, name, `"`)
		log.Info(`Collection "`, name, `" created`)
	}

	return routes
}

func SeedData(schemaTemplate map[string]interface{}, key string, datumDir string, numEntries int, randomize bool) error {

	collection := DB.Use(key)
	files, err := ioutil.ReadDir(datumDir)
	if err != nil {
		log.Error("Could not access datum dir.")
		return err
	}
	datum := map[string][]string{}

	for _, file := range files {
		contents, err := os.Open(datumDir + "/" + file.Name())
		if err != nil {
			log.Error("Could not read user seed file")
			return err
		}
		datumType := strings.Split(file.Name(), ".")[0]
		defer contents.Close()

		scanner := bufio.NewScanner(contents)
		var array []string
		for scanner.Scan() {
			array = append(array, scanner.Text())
		}
		datum[datumType] = array
	}

	// always create the same seed so that the initial seed data is always the same
	rand.Seed(0)

	for i := 0; i < numEntries; i++ {
		newEntry := map[string]interface{}{}
		for k, v := range schemaTemplate {
			newEntry[k] = v
		}

		// create an array of unique integer permutations so we dont repeat random data
		permArrays := map[string][]int{}
		for keyword, valArray := range datum {

			if _, ok := permArrays[keyword]; !ok {
				if randomize {
					permArrays[keyword] = rand.Perm(len(valArray))
				} else {
					orderedArray := make([]int, len(valArray))
					for i := 0; i < len(valArray); i++ {
						orderedArray[i] = i
					}
					permArrays[keyword] = orderedArray
				}
			}

			// replace any _keywords_ with a random value
			for k, v := range newEntry {
				if value, ok := v.(string); ok {
					search := "_" + keyword + "_"
					replace := valArray[permArrays[keyword][i%len(valArray)]]
					newVal := strings.Replace(value, search, replace, -1)
					newEntry[k] = newVal
				} else {
					newEntry[k] = v
				}
			}
		}

		// try to unmarshal any nested json before inserting to the database.
		for k, v := range newEntry {
			var z interface{}
			if stringVal, ok := v.(string); ok {
				err := json.Unmarshal([]byte(stringVal), &z)
				if err == nil {
					newEntry[k] = z
				}
			}
		}

		// insert the entry into the collection.
		_, err := collection.Insert(newEntry)
		if err != nil {
			log.Error("Could not insert entry into collection: ", err)
			continue
		}
	}

	return nil
}

func GetCollections(db *db.DB) []string {
	var collections []string
	for _, collection := range db.AllCols() {
		collections = append(collections, collection)
	}
	return collections
}

func CheckIfCollectionExists(collection string, db *db.DB) bool {
	collections := GetCollections(db)
	for _, a := range collections {
		if a == collection {
			return true
		}
	}
	return false
}
