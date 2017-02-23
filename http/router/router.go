package router

import (
	"net/http"

	"github.com/Teradata/covalent-data/http/handlers"

	log "github.com/Sirupsen/logrus"
	"github.com/goware/cors"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
)

var router chi.Router
var c = cors.New(cors.Options{
	AllowedOrigins:   []string{"*"},
	AllowedHeaders:   []string{"*"},
	AllowedMethods:   []string{"Get", "Post", "Put", "Patch", "Delete"},
	AllowCredentials: true,
})

func Initialize() {
	router = chi.NewRouter()

	// add middlewares
	router.Use(c.Handler)
	router.Use(middleware.StripSlashes)

	// add unprotected routes
	router.Get("/", handlers.Home)
	router.Get("/health", handlers.Health)
	router.Get("/ping", handlers.Ping)
}

func Start(port string) {
	log.Info("Listening on port :" + port)
	addr := ":" + port
	log.Warn(http.ListenAndServe(addr, router))
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
		router.Get("/"+endpoint, handlers.ReadAllObjects)
		router.Get("/"+endpoint+"/:id", handlers.ReadObject)
		router.Post("/"+endpoint, handlers.CreateObject)
		router.Patch("/"+endpoint+"/:id", handlers.UpdateObject)
		router.Put("/"+endpoint+"/:id", handlers.UpdateObject)
		router.Delete("/"+endpoint+"/:id", handlers.DeleteObject)
	}
}

// Add chart API routes
func AddChartRoutes() {
	router.Get("/charts", handlers.GetCharts)
	router.Get("/charts/:key", handlers.ReadChart)
}

// Add login routes
func AddLoginRoutes() {
	router.Post("/login", handlers.RequestToken)
}
