package helpers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func GetBasePath(r *http.Request) string {
	return strings.Split(r.URL.Path, "/")[1]
}

func GetRequestBody(r *http.Request, m interface{}) error {
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(m)
	if err != nil {
		return fmt.Errorf("Request body could not be decoded into the proper JSON structure.")
	}

	return nil
}
