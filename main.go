package main

import (
	"fmt"
	"log"
	"net/http"

	chi "github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	cors "github.com/go-chi/cors"
)

func main() {
	fmt.Println(`Server started`)
	r := chi.NewRouter()
	r.Use(chiMiddleware.Logger)
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})
	r.Get("/foo1", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome from foo"))
	})
	r.Get("/html", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
 hello world
</body>
</html>`))
	})

	r.Get("/add-contact", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`<li class="p-1 mb-1 bg-blue-100 rounded-xl">server - server</li>`))
	})

	log.Fatal(http.ListenAndServe("localhost:3002", r))
}
