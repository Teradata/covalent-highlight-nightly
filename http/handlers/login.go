package handlers

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/Teradata/covalent-data/http/helpers"
	"github.com/Teradata/covalent-data/login"
	"github.com/julienschmidt/httprouter"
)

func RequestToken(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//collection := helpers.GetBasePath(r)
	b := &map[string]interface{}{}
	helpers.GetRequestBody(r, b)
	if b == nil {
		helpers.RespondBadRequest(w)
		log.Error("Badly formatted request body.")
		return
	}
	log.Info("Executing RequestToken...")

	token, err := login.RequestToken(b)
	if err != nil {
		helpers.RespondServerError(w, "could not retrieve token")
		return
	}
	t := *token
	w.Header().Set("x-auth-token", t["access_token"].(string))
	helpers.Respond(w, token, http.StatusOK)
}
