package funcs

import (
	"math/rand"
	"strings"
	"text/template"

	"github.com/satori/go.uuid"
)

var FuncMap = template.FuncMap{
	"uuid":         UUID,
	"toLower":      toLower,
	"toUpper":      toUpper,
	"titleCase":    titleCase,
	"trimSpaces":   trimSpaces,
	"randomNumber": randomNumber,
	"boolean":      boolean,
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

func titleCase(in interface{}) interface{} {
	switch in.(type) {
	case string:
		return strings.ToUpper(string([]byte{in.(string)[0]})) + strings.ToLower(in.(string)[1:])
	default:
		return in
	}
}

func trimSpaces(in interface{}) interface{} {
	switch in.(type) {
	case string:
		return strings.Replace(in.(string), " ", "", -1)
	default:
		return in
	}
}

func boolean(in interface{}) interface{} {
	switch in.(type) {
	case float64:
		if rand.Float64() < float64(in.(float64)) {
			return true
		}
		return false
	default:
		return false
	}
}
