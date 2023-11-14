package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	chi "github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	cors "github.com/go-chi/cors"
)

var middleware1 = chiMiddleware.Logger
var middleware2 = cors.Handler(cors.Options{
	// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
	AllowedOrigins: []string{"https://*", "http://*"},
	// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	ExposedHeaders:   []string{"Link"},
	AllowCredentials: false,
	MaxAge:           300, // Maximum value not ignored by any of major browsers
})

type Contact struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func getDataFromHttpResponseBody[T any](httpResponseBody io.ReadCloser, data T) (err error, rtn T) {
	body, err := io.ReadAll(httpResponseBody)
	if err != nil {
		return err, data
	}
	err1 := json.Unmarshal(body, &data)
	if err1 != nil {
		return err1, data
	}
	return nil, data

}

func main() {
	fmt.Println(`Server started`)
	r := chi.NewRouter()
	r.Use(middleware1)
	r.Use(middleware2)

	r.Post("/add-contact", func(w http.ResponseWriter, r *http.Request) {
		var cd Contact
		getDataFromHttpResponseBody(r.Body, &cd)
		fmt.Println(cd.Name)
		w.Write([]byte(`<li class="p-1 mb-1 bg-blue-100 rounded-xl">` + cd.Name + ` - ` + cd.Email + `</li>`))
	})

	log.Fatal(http.ListenAndServe("localhost:3002", r))
}
