package handlers

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/Teradata/covalent-data/charts"
	"github.com/Teradata/covalent-data/http/helpers"
	"github.com/julienschmidt/httprouter"
)

func ReadChart(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	key := ps.ByName("key")
	log.Info("Retrieving chart data for ", key)
	params := helpers.GetQueryParams(r)
	data, total := charts.GetSetData(key, params.PerPage)
	if data == nil {
		log.Info("No chart exists with key ", key)
		helpers.Respond(w, nil, http.StatusNotFound)
		return
	}
	helpers.AddPaginationHeaders(w, total, len(*data), 0)
	helpers.Respond(w, data, http.StatusOK)
}

func GetCharts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Info("Retrieving list of charts")
	data := charts.ListSets()
	helpers.Respond(w, data, http.StatusOK)
}
