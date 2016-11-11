package crud

import (
	//"fmt"
	"sort"
	//log "github.com/Sirupsen/logrus"
)

var more = false

type Object struct {
	Key  interface{}
	Item map[string]interface{}
}

type Objects []Object

func (o Objects) Len() int {
	return len(o)
}

func (o Objects) Less(i, j int) bool {
	switch v := o[i].Key.(type) {
	case string:
		if more {
			return v > o[j].Key.(string)
		}
		return v < o[j].Key.(string)
	case int:
		if more {
			return v > o[j].Key.(int)
		}
		return v < o[j].Key.(int)
	case float64:
		if more {
			return v > o[j].Key.(float64)
		}
		return v < o[j].Key.(float64)
	default:
		return false
	}
}

func (o Objects) Swap(i, j int) {
	o[i], o[j] = o[j], o[i]
}

func Sort(slice []map[string]interface{}, direction string, column string) []map[string]interface{} {
	if len(slice) == 0 {
		return slice
	}

	if direction == "desc" {
		more = true
	} else {
		more = false
	}
	objects := Objects{}
	for _, v := range slice {
		if _, ok := v[column]; ok {
			o := Object{
				Key:  v[column],
				Item: v,
			}
			objects = append(objects, o)
		} else {
			return slice
		}
	}
	sort.Sort(objects)
	sorted := []map[string]interface{}{}
	for _, v := range objects {
		sorted = append(sorted, v.Item)
	}

	return sorted
}
