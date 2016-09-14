package crud

import (
	"fmt"

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

	return docID, nil
}

func Read(collection string, columns []string, query interface{}) ([]map[string]interface{}, int, error) {
	var results []map[string]interface{}
	queryResult := make(map[int]struct{})

	t := DB.Use(collection)
	t.Index(columns)
	if err := db.EvalQuery(query, t, &queryResult); nil != err {
		log.Error("Could not execute the query: ", err)
		return nil, 0, err
	}

	for id := range queryResult {
		rb, err := t.Read(id)
		if nil != err {
			log.Error("Could not read ID: ", err)
			return nil, 0, err
		}
		results = append(results, rb)
	}

	return results, len(results), nil
}

func Update(collection string, searchCol string, id string, doc *map[string]interface{}) error {
	if !CheckIfCollectionExists(collection, DB) {
		errmsg := collection + " collection does not exist."
		log.Error(errmsg)
		return fmt.Errorf(errmsg)
	}

	query := map[string]interface{}{
		"eq":    id,
		"in":    []interface{}{searchCol},
		"limit": 1,
	}

	t := DB.Use(collection)

	queryResult := make(map[int]struct{})
	if err := db.EvalQuery(query, t, &queryResult); nil != err {
		log.Error("Could not execute the query:", err)
		return err
	}

	for id := range queryResult {
		err := t.Update(id, *doc)
		if err != nil {
			log.Error("Could not update the document: ", err)
			return err
		}
	}

	return nil
}

func Delete(collection string, searchCol string, id string) error {
	query := map[string]interface{}{
		"eq":    id,
		"in":    []interface{}{searchCol},
		"limit": 1,
	}

	t := DB.Use(collection)

	queryResult := make(map[int]struct{})
	if err := db.EvalQuery(query, t, &queryResult); nil != err {
		log.Error("Could not execute the query:", err)
		return err
	}

	for id := range queryResult {
		err := t.Delete(id)
		if err != nil {
			log.Error("Could not delete the document: ", err)
			return err
		}
	}

	t.Index([]string{searchCol})

	return nil
}
