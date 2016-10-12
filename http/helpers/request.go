package helpers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

type Params struct {
	Page    int
	PerPage int
	Sort    string
	Query   string
	Custom  map[string]string
}

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

func GetQueryParams(r *http.Request) *Params {
	p := &Params{
		Page:    0,
		PerPage: 0,
		Sort:    r.URL.Query().Get("sort"),
		Query:   r.URL.Query().Get("q"),
	}

	if page, err := strconv.Atoi(r.URL.Query().Get("page")); err == nil {
		p.Page = page
	}

	if perPage, err := strconv.Atoi(r.URL.Query().Get("per_page")); err == nil {
		p.PerPage = perPage
	}

	return p
}
