package main

import (
	"fmt"
	"log"
	"net/http"

	chi "github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
)

const url = "localhost:3002"

func main() {
	fmt.Println("server started")

	r := chi.NewRouter()
	r.Use(chiMiddleware.Logger)

	http.HandleFunc("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		templateString := `this is server code`
		fmt.Fprintf(w, templateString)
	}))

	http.HandleFunc("/foo", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		templateString := `this is server code at foo`
		fmt.Fprintf(w, templateString)
	}))

	log.Fatal(http.ListenAndServe(url, nil))
}
