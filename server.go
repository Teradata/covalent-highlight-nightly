package main

import (
	"flag"
	"path/filepath"

	"github.com/Teradata/covalent-data/config"
	"github.com/Teradata/covalent-data/http/router"

	log "github.com/Sirupsen/logrus"
)

func main() {

	// get the absolute path of where the program is being run from.
	f, _ := filepath.Abs(".")

	// directories to look for schema and datum data
	schemaDir := f + "/config/schemas"
	datumDir := f + "/config/datum"
	chartDir := f + "/config/chartdir"

	// define command line flags here.
	port := flag.String("port", "8080", "port to listen on")
	sDir := flag.String("schemadir", schemaDir, "absolute directory where schemas are located")
	dDir := flag.String("datumdir", datumDir, "absolute directory where datum is located")
	cDir := flag.String("chartdir", chartDir, "absolute directory where charts located")
	flag.Parse()

	// copyright and stuff.
	log.Info("##################################################################")
	log.Info("########                                                  ########")
	log.Info("######## Teradata Covalent Atomic Data mock API server    ########")
	log.Info("######## Copyright 2016 by Teradata. All rights reserved. ########")
	log.Info("######## This software is covered under the MIT license.  ########")
	log.Info("########                                                  ########")
	log.Info("##################################################################")
	log.Info("")

	go config.Watch([]string{*sDir, *dDir, *cDir})

	// initialize the router with default routes.
	log.Info("Initializing HTTP router...")
	router.Initialize(*sDir, *dDir, *cDir)
	router.Start(*port)
}
