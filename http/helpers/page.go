package helpers

import (
	"math"
	"net/http"
	"strconv"
)

func GetPageSlice(data []map[string]interface{}, perPage int, page int) ([]map[string]interface{}, int) {
	total := len(data)
	startIndex := (page - 1) * perPage
	endIndex := startIndex + perPage

	if startIndex >= total-1 {
		return data, len(data)
	}

	if endIndex > total {
		endIndex = total
	}

	return data[startIndex:endIndex], len(data[startIndex:endIndex])
}

func AddPaginationHeaders(w http.ResponseWriter, total int, perPage int, page int) {
	totalPages := 0
	if page > 0 {
		w.Header().Set("X-Page", strconv.Itoa(page))
	}
	if perPage > 0 {
		totalPages = int(math.Ceil(float64(total) / float64(perPage)))
	}
	w.Header().Set("X-Length", strconv.Itoa(perPage))
	w.Header().Set("X-Total", strconv.Itoa(total))
	w.Header().Set("X-Total-Pages", strconv.Itoa(totalPages))
}
