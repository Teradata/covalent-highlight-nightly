package router

import (
	"net/http"

	"github.com/Teradata/covalent-data/charts"
	"github.com/Teradata/covalent-data/crud"
	"github.com/Teradata/covalent-data/http/handlers"

	log "github.com/Sirupsen/logrus"
	"github.com/goware/cors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
)

var server = &http.Server{}
var r chi.Router
var c = cors.New(cors.Options{
	AllowedOrigins:   []string{"*"},
	AllowedHeaders:   []string{"*"},
	AllowedMethods:   []string{"Get", "Post", "Put", "Patch", "Delete"},
	AllowCredentials: true,
})

func Initialize(sDir string, dDir string, cDir string) {
	r = chi.NewRouter()

	// add middlewares
	r.Use(c.Handler)
	r.Use(middleware.StripSlashes)

	// import schemas and mock data
	log.Info("Importing schemas for CRUD objects and seeding initial mock data...")
	routes := crud.SeedDB(sDir, dDir)
	charts.SeedCharts(cDir)

	// add unprotected routes
	r.Get("/", handlers.Home)
	r.Get("/health", handlers.Health)
	r.Get("/ping", handlers.Ping)

	// add generated endpoints for imported schema objects
	log.Info("Registering routes...")
	AddCrudRoutes(routes)
	AddChartRoutes()
	AddLoginRoutes()
}

func Start(port string) {
	// start the router and server
	log.Info("Listening on port :", port)
	server.Addr = ":" + port
	server.Handler = r
	log.Error(server.ListenAndServe())
	defer Stop()
}

// Dynamic route addition for CRUD objects
func AddCrudRoutes(endpoints []string) {
	if len(endpoints) == 0 {
		log.Info("No routes have specified, so none have been added.")
		return
	}

	for _, endpoint := range endpoints {
		if endpoint == "" {
			continue
		}
		r.Get("/"+endpoint, handlers.ReadAllObjects)
		r.Get("/"+endpoint+"/:id", handlers.ReadObject)
		r.Post("/"+endpoint, handlers.CreateObject)
		r.Patch("/"+endpoint+"/:id", handlers.UpdateObject)
		r.Put("/"+endpoint+"/:id", handlers.UpdateObject)
		r.Delete("/"+endpoint+"/:id", handlers.DeleteObject)
	}
}

// Add chart API routes
func AddChartRoutes() {
	r.Get("/charts", handlers.GetCharts)
	r.Get("/charts/:key", handlers.ReadChart)
}

// Add login routes
func AddLoginRoutes() {
	r.Post("/login", handlers.RequestToken)
}

func Stop() {
	server.Shutdown(nil)
}
