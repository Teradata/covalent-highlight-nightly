package handlers

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/Teradata/covalent-data/charts"
	"github.com/Teradata/covalent-data/http/helpers"
	"github.com/julienschmidt/httprouter"
)

type Chart struct {
	Name          string  `json:"name"`
	Key           string  `json:"key"`
	NumDataPoints float64 `json:"num_data_points"`
	IntervalS     float64 `json:"interval_seconds"`
	Active        bool    `json:"active"`
	YAxes         []YAxis `json:"y_axes"`
}

type YAxis struct {
	Name         string `json:"name"`
	FunctionType string `json:"function_type"`
}

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
	log.Info("Executing ListSets()")
	data := charts.ListSets()
	helpers.Respond(w, data, http.StatusOK)
}

func CreateChart(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Info("Executing Create New Chart")
	c := &Chart{}
	err := helpers.GetRequestBody(r, c)
	if err != nil {
		log.Error("Malformed request: ", err)
		helpers.Respond(w, err, http.StatusBadRequest)
		return
	}
	// TODO: check y axis function exists

	// create new chart
	s := charts.NewSet(c.Name, c.Key, int(c.NumDataPoints), int(c.IntervalS))
	if s == nil {
		log.Error("Malformed request: Length or Interval")
		// TODO fix the error stuff to accept variadic status
		helpers.Respond(w, "Malformed request: Length or Interval missing.", http.StatusBadRequest)
		return
	}
	// add y axes
	for _, y := range c.YAxes {
		err := s.AddYAxis(y.Name, charts.Functions[y.FunctionType])
		if err != nil {
			helpers.Respond(w, "Malformed request: Function does not exist", http.StatusBadRequest)
			return
		}
	}

	// start it
	s.Run()
	c.Active = s.IsActive()
	c.Key = s.Key

	helpers.Respond(w, c, http.StatusOK)
}

func DeleteChart(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	key := ps.ByName("key")
	charts.DeleteSet(key)
	helpers.Respond(w, nil, http.StatusOK)
}
