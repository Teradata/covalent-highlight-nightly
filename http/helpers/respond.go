package helpers

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func Respond(w http.ResponseWriter, body interface{}, status int) {

	switch body.(type) {
	case string:
		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(status)
		if body.(string) != "" {
			w.Write([]byte(body.(string)))
		}
		return
	case map[string]interface{}:
		js, _ := json.Marshal(body)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(status)
		if body != nil {
			w.Write(js)
			return
		}
	case nil:
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(status)
		return
	default:
		js, err := json.Marshal(body)
		if err == nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(status)
			w.Write(js)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte("uh-oh, something went wrong"))
		return
	}
}

func RespondNotFound(w http.ResponseWriter, element string) {
	message := Response{Message: element + " was not found."}
	Respond(w, message, http.StatusNotFound)
}

func RespondServerError(w http.ResponseWriter, action string) {
	message := Response{Message: "Internal server error while " + action}
	Respond(w, message, http.StatusInternalServerError)
}

func RespondBadRequest(w http.ResponseWriter) {
	message := Response{Message: "Request body must be properly formatted JSON."}
	Respond(w, message, http.StatusBadRequest)
}
