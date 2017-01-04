package crud

import (
	"math/rand"
	"strings"
	"text/template"

	"github.com/satori/go.uuid"
)

var funcMap = template.FuncMap{
	"uuid":         UUID,
	"toLower":      toLower,
	"toUpper":      toUpper,
	"randomNumber": randomNumber,
}

func randomNumber(maxnum int) int {
	return rand.Intn(maxnum)
}

func UUID() string {
	return uuid.NewV4().String()
}

func toLower(in interface{}) interface{} {
	switch in.(type) {
	case string:
		return strings.ToLower(in.(string))
	default:
		return in
	}
}

func toUpper(in interface{}) interface{} {
	switch in.(type) {
	case string:
		return strings.ToUpper(in.(string))
	default:
		return in
	}
}
