package router

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"

	"github.com/Teradata/covalent-data/http/handlers"
)

var router *httprouter.Router
var server = &http.Server{}
var c = cors.New(cors.Options{
	AllowedOrigins:   []string{"*"},
	AllowCredentials: true,
	AllowedHeaders:   []string{"*"},
	AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
})

func Initialize() {
	router = httprouter.New()
	router.GET("/", handlers.Home)
	router.GET("/health", handlers.Health)
	router.GET("/ping", handlers.Ping)
}

func Start(port string) {

	log.Info("Adding CORS support")
	handler := c.Handler(router)

	log.Info("Listening on port :" + port)
	server.Addr = ":" + port
	server.Handler = handler
	log.Warn(server.ListenAndServe())
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
		router.GET("/"+endpoint, handlers.ReadAllObjects)
		router.GET("/"+endpoint+"/:id", handlers.ReadObject)
		router.POST("/"+endpoint, handlers.CreateObject)
		router.PATCH("/"+endpoint+"/:id", handlers.UpdateObject)
		router.PUT("/"+endpoint+"/:id", handlers.UpdateObject)
		router.DELETE("/"+endpoint+"/:id", handlers.DeleteObject)
	}
}

// Add chart API routes
func AddChartRoutes() {
	router.GET("/charts", handlers.GetCharts)
	router.GET("/charts/:key", handlers.ReadChart)
	router.POST("/charts", handlers.CreateChart)
	router.DELETE("/charts/:key", handlers.DeleteChart)
}
