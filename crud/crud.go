package crud

import (
	"fmt"
	"strings"

	"github.com/HouzuoGuo/tiedot/db"
	log "github.com/Sirupsen/logrus"
)

func Create(collection string, doc *map[string]interface{}) (int, error) {
	if !CheckIfCollectionExists(collection, DB) {
		errmsg := collection + " collection does not exist."
		log.Error(errmsg)
		return 0, fmt.Errorf(errmsg)
	}

	t := DB.Use(collection)
	docID, err := t.Insert(*doc)
	if err != nil {
		log.Error("Could not insert into "+collection+": ", err)
		return 0, err
	}
	t.Index(indices[collection])

	return docID, nil
}

func Read(collection string, id interface{}, sort string) ([]map[string]interface{}, int, error) {
	var results []map[string]interface{}
	queryResult := make(map[int]struct{})
	query := map[string]interface{}{
		"eq":    id,
		"in":    []interface{}{indices[collection][0]},
		"limit": 1,
	}

	t := DB.Use(collection)
	t.Index(indices[collection])

	if id == "all" {
		if err := db.EvalQuery(id, t, &queryResult); nil != err {
			log.Error("Could not execute the query: ", err)
			return nil, 0, err
		}
	} else {
		if err := db.EvalQuery(query, t, &queryResult); nil != err {
			log.Error("Could not execute the query: ", err)
			return nil, 0, err
		}
	}

	for i := range queryResult {
		rb, err := t.Read(i)
		if nil != err {
			log.Warn("Could not read ID ", i, ". It may have been deleted.")
			continue
		}
		results = append(results, rb)
	}

	sortOpts := strings.Split(sort, ":")
	if len(sortOpts) == 2 {
		results = Sort(results, sortOpts[0], sortOpts[1])
	}

	return results, len(results), nil
}

func Update(collection string, id string, doc *map[string]interface{}) (map[string]interface{}, error) {
	if !CheckIfCollectionExists(collection, DB) {
		errmsg := collection + " collection does not exist."
		log.Error(errmsg)
		return nil, fmt.Errorf(errmsg)
	}

	query := map[string]interface{}{
		"eq":    id,
		"in":    []interface{}{indices[collection][0]},
		"limit": 1,
	}

	t := DB.Use(collection)
	t.Index(indices[collection])

	queryResult := make(map[int]struct{})
	if err := db.EvalQuery(query, t, &queryResult); nil != err {
		log.Error("Could not execute the query:", err)
		return nil, err
	}

	for i := range queryResult {
		err := t.Update(i, *doc)
		if err != nil {
			log.Error("Could not update the document: ", err)
			return nil, err
		}
	}

	return *doc, nil
}

func Delete(collection string, id string) error {
	query := map[string]interface{}{
		"eq":    id,
		"in":    []interface{}{indices[collection][0]},
		"limit": 1,
	}

	t := DB.Use(collection)
	t.Index(indices[collection])

	queryResult := make(map[int]struct{})
	if err := db.EvalQuery(query, t, &queryResult); nil != err {
		log.Error("Could not execute the query:", err)
		return err
	}

	for i := range queryResult {
		err := t.Delete(i)
		if err != nil {
			log.Error("Could not delete the document: ", err)
			return err
		}
	}

	return nil
}
