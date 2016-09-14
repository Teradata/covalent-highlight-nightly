package helpers

import (
	"encoding/json"
	"net/http"
	"strings"
)

func GetBasePath(r *http.Request) string {
	return strings.Split(r.URL.Path, "/")[1]
}

func GetRequestBody(r *http.Request) *map[string]interface{} {
	decoder := json.NewDecoder(r.Body)
	var m map[string]interface{}
	err := decoder.Decode(&m)
	if err != nil {
		return nil
	}

	return &m
}
