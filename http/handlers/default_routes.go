package handlers

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/Teradata/covalent-data/http/helpers"
	"github.com/julienschmidt/httprouter"
)

func Home(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Info("Serving up Home")
	helpers.Respond(w, nil, 200)
}

func Health(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Info("Serving up Health")
	h := map[string]interface{}{
		"status": "healthy",
	}
	helpers.Respond(w, h, 200)
}

func Ping(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Info("Serving up Ping")
	p := map[string]interface{}{
		"ping": "pong",
	}
	helpers.Respond(w, p, 200)
}
