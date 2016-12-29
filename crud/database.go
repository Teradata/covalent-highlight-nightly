package crud

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/HouzuoGuo/tiedot/db"
	log "github.com/Sirupsen/logrus"
)

var DB *db.DB

func CreateDB() {
	// create a temp dir for the database
	f, err := filepath.Abs(".")
	if err != nil {
		log.Fatal("No access to the filesystem.  Goodbye.")
	}

	DBDir := f + "/.tmp"
	os.RemoveAll(DBDir)
	defer os.RemoveAll(DBDir)

	// Create the database or die.
	DB, err = db.OpenDB(DBDir)
	if err != nil {
		log.Fatal("could not write data to temp dir.  Exiting.")
	}
}

func SeedDB(schemaDir string, dataDir string) []string {
	CreateDB()
	datum := ImportDatum(dataDir)
	files, _ := ioutil.ReadDir(schemaDir)
	for _, file := range files {
		template := ImportSchema(schemaDir, file.Name())
		o := NewObject(template, strings.Split(file.Name(), ".")[0])
		err := o.GetSeedProperties()
		if err != nil {
			if err.Error() == "no template" {
				continue
			}
			log.Error("Could not parse schema ", file.Name(), ": ", err)
			continue
		}

		log.Info("Importing ", file.Name(), "...")
		CreateCollection(o.Name)
		o.CreateDataMap(datum)
		for i := 0; i < o.NumSeeds; i++ {
			b := executeTemplate(o.RawTemplate, o.DataMap[i])
			m, _ := unmarshalYaml(b)
			AddEntryToCollection(o.Name, m)
		}
	}

	return GetCollections()
}

func GetCollections() []string {
	var collections []string
	for _, collection := range DB.AllCols() {
		collections = append(collections, collection)
	}
	return collections
}

func CheckIfCollectionExists(collection string) bool {
	collections := GetCollections()
	for _, a := range collections {
		if a == collection {
			return true
		}
	}
	return false
}

func CreateCollection(key string) error {
	if err := DB.Create(key); err != nil {
		log.Error("Issue creating collection in database for ", key, ": ", err)
		return err
	}

	log.Info("Collection created for ", key)
	return nil
}

func AddEntryToCollection(collection string, entry map[string]interface{}) error {
	c := DB.Use(collection)
	_, err := c.Insert(entry)
	if err != nil {
		return err
	}

	return nil
}
