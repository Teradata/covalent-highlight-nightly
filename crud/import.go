package crud

import (
	"bufio"
	"io/ioutil"
	"os"
	"strings"

	log "github.com/Sirupsen/logrus"
)

func ImportDatum(dir string) *map[string][]string {
	_, err := os.Stat(dir)
	if err != nil {
		log.Error("schema and/or datum directory does not exist. no default data has been seeded.")
	}

	files, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Error("Could not access datum dir.")
		return nil
	}

	datum := map[string][]string{}

	for _, file := range files {
		contents, err := os.Open(dir + "/" + file.Name())
		if err != nil {
			log.Error("Could not read user seed file")
			return nil
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

	return &datum
}

func ImportSchema(dir, fileName string) []byte {

	schema := []byte{}
	_, err := os.Stat(dir + "/" + fileName)
	if err != nil {
		log.Error(fileName, ": filename does not exist. no default data has been seeded.")
		return schema
	}

	schema = parseFile(dir, fileName, 0, false)
	return schema
}
