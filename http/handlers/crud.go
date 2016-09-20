package handlers

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/Teradata/covalent-data/crud"
	"github.com/Teradata/covalent-data/http/helpers"
	"github.com/julienschmidt/httprouter"
)

func ReadObject(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	collection := helpers.GetBasePath(r)

	log.Info("Executing ReadObject on " + collection + "/" + id)
	query := map[string]interface{}{
		"eq":    id,
		"in":    []interface{}{"id"},
		"limit": 1,
	}
	cols := []string{"id"}
	resp, num, _ := crud.Read(collection, cols, query)
	if num == 0 {
		helpers.RespondNotFound(w, id)
		return
	}
	helpers.Respond(w, resp[0], http.StatusOK)
}

func ReadAllObjects(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	collection := helpers.GetBasePath(r)
	log.Info("Executing ReadAllObjects on " + collection)
	data, _, _ := crud.Read(collection, []string{}, "all")
	helpers.Respond(w, data, http.StatusOK)
}

func CreateObject(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	collection := helpers.GetBasePath(r)
	b := &map[string]interface{}{}
	helpers.GetRequestBody(r, b)
	log.Info("Executing CreateObject on " + collection)
	if b == nil {
		helpers.RespondBadRequest(w)
		log.Error("Badly formatted request body.")
		return
	}

	docID, err := crud.Create(collection, b)
	if err != nil {
		helpers.RespondServerError(w, "performing an insert")
		log.Error(err)
		return
	}
	log.Info("Created object in "+collection+" with document ID ", docID)
	helpers.Respond(w, b, http.StatusOK)

}

func UpdateObject(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	collection := helpers.GetBasePath(r)
	b := &map[string]interface{}{}
	helpers.GetRequestBody(r, b)
	log.Info("Executing UpdateObject on " + collection + "/" + id)

	//to do- make all these id's query parameters
	doc, err := crud.Update(collection, "id", id, b)
	if err != nil {
		helpers.RespondServerError(w, "performing an update")
		log.Error(err)
		return
	}

	log.Info("Updated object " + collection + "/" + id)
	helpers.Respond(w, doc, http.StatusOK)
}

func DeleteObject(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	collection := helpers.GetBasePath(r)
	log.Info("Executing DeleteObject on " + collection + "/" + id)

	//to do- make all these id's query parameters
	err := crud.Delete(collection, "id", id)
	if err != nil {
		helpers.RespondServerError(w, "performing a delete")
		log.Error(err)
		return
	}

	log.Info("Deleted object " + collection + "/" + id)
	helpers.Respond(w, nil, http.StatusOK)
}
