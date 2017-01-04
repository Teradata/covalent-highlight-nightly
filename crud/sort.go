package crud

import (
	"sort"
)

var more = false

type Document struct {
	Key  interface{}
	Item map[string]interface{}
}

type Documents []Document

func (d Documents) Len() int {
	return len(d)
}

func (d Documents) Less(i, j int) bool {
	switch v := d[i].Key.(type) {
	case string:
		if more {
			return v > d[j].Key.(string)
		}
		return v < d[j].Key.(string)
	case int:
		if more {
			return v > d[j].Key.(int)
		}
		return v < d[j].Key.(int)
	case float64:
		if more {
			return v > d[j].Key.(float64)
		}
		return v < d[j].Key.(float64)
	default:
		return false
	}
}

func (d Documents) Swap(i, j int) {
	d[i], d[j] = d[j], d[i]
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
	documents := Documents{}
	for _, v := range slice {
		if _, ok := v[column]; ok {
			d := Document{
				Key:  v[column],
				Item: v,
			}
			documents = append(documents, d)
		} else {
			return slice
		}
	}
	sort.Sort(documents)
	sorted := []map[string]interface{}{}
	for _, v := range documents {
		sorted = append(sorted, v.Item)
	}

	return sorted
}
