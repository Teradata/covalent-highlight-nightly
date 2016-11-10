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
	qp := helpers.GetQueryParams(r)

	log.Info("Executing ReadObject on " + collection + "/" + id)
	resp, num, _ := crud.Read(collection, id, qp.Sort)
	if num == 0 {
		helpers.RespondNotFound(w, id)
		return
	}
	helpers.Respond(w, resp[0], http.StatusOK)
}

func ReadAllObjects(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	collection := helpers.GetBasePath(r)
	qp := helpers.GetQueryParams(r)
	page := qp.Page
	perPage := qp.PerPage

	log.Info("Executing ReadAllObjects on " + collection)
	data, total, _ := crud.Read(collection, "all", qp.Sort)

	if total == 0 {
		helpers.RespondNotFound(w, collection)
		return
	}

	// if page is 0, send everything
	if page == 0 {
		helpers.AddPaginationHeaders(w, total, total, 1)
		helpers.Respond(w, data, http.StatusOK)
		return
	}

	// if per_page > 0 but no page, send first page
	if perPage == 0 && page > 0 {
		perPage = 50
	}

	pageSlice, perPage := helpers.GetPageSlice(data, perPage, page)
	helpers.AddPaginationHeaders(w, total, perPage, page)
	helpers.Respond(w, pageSlice, http.StatusOK)
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
	doc, err := crud.Update(collection, id, b)
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
	err := crud.Delete(collection, id)
	if err != nil {
		helpers.RespondServerError(w, "performing a delete")
		log.Error(err)
		return
	}

	log.Info("Deleted object " + collection + "/" + id)
	helpers.Respond(w, nil, http.StatusNoContent)
}
