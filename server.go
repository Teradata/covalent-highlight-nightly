package main

import (
	"flag"
	"path/filepath"

	log "github.com/Sirupsen/logrus"

	"github.com/Teradata/covalent-data/crud"
	"github.com/Teradata/covalent-data/router"
)

func main() {

	// get the absolute path of where the program is being run from.
	f, _ := filepath.Abs(".")

	// directories to look for schema and datum data
	schemaDir := f + "/schemas"
	datumDir := f + "/datum"

	// define command line flags here.
	port := flag.String("port", "8080", "port to listen on")
	sDir := flag.String("schemadir", schemaDir, "absolute directory where schemas are located")
	dDir := flag.String("datumdir", datumDir, "absolute directory where datum is located")
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

	// initialize the router with default routes.
	log.Info("Initializing HTTP router...")
	router.Initialize()

	// import schemas and mock data
	log.Info("Importing schemas for CRUD objects and seeding initial mock data...")
	routes := crud.ImportSchemas(*sDir, *dDir)

	// add generated endpoints for imported schema objects
	log.Info("Adding HTTP routes for object CRUD endpoints...")
	router.AddCrudRoutes(routes)
	router.AddChartRoutes()

	// start the router and server
	log.Info("Starting HTTP router and server...")
	router.Start(*port)
}
