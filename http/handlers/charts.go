package handlers

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/Teradata/covalent-data/charts"
	"github.com/Teradata/covalent-data/http/helpers"
	"github.com/julienschmidt/httprouter"
)

type Chart struct {
	xIntervalSeconds int `json:"x_axis_interval_seconds"`
	length           int `json:"num_data_points"`
}

func ReadChart(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	//id := ps.ByName("id")
	helpers.Respond(w, nil, http.StatusOK)
}

func GetCharts(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	log.Info("Executing ListSets()")
	data := charts.ListSets()
	helpers.Respond(w, data, http.StatusOK)
}

func CreateChart(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Info("Executing New Chart")
}

func DeleteChart(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	//id := ps.ByName("id")
	helpers.Respond(w, nil, http.StatusOK)
}
