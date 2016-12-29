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

func randomNumber() int {
	return rand.Intn(1000000)
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
