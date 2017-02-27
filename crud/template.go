package crud

import (
	"bytes"
	"text/template"

	"github.com/Teradata/covalent-data/funcs"

	log "github.com/Sirupsen/logrus"
)

type Template []byte

func (t Template) String() string {
	return string(t)
}

func executeTemplate(byteStream []byte, vars map[string]interface{}) []byte {
	tmpl, err := template.New("tmp").Funcs(funcs.FuncMap).Parse(string(byteStream))
	if err != nil {
		log.Error("Could not parse the file:", err)
		return []byte{}
	}

	templateOut := new(bytes.Buffer)

	err = tmpl.Execute(templateOut, vars)
	if err != nil {
		log.Error("Could not execute the template:", err)
		return []byte{}
	}

	return templateOut.Bytes()
}
