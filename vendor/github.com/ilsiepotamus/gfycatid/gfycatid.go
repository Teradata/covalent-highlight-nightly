package gfycatid

import (
	"bytes"
	"io/ioutil"
	"math/rand"
	"net/http"
	"time"

	"github.com/ilsiepotamus/gfycatid/assets"
)

var adjectives = bytes.Split(assets.Adjectives, []byte("\n"))
var animals = bytes.Split(assets.Animals, []byte("\n"))

const adjectivesURL = "http://assets.gfycat.com/adjectives"
const animalsURL = "http://assets.gfycat.com/animals"

// New() creates a new randomized gfycat ID that is
// formatted as an AdjectiveAdjectiveAnimal
func New() string {
	rand.Seed(time.Now().UnixNano())

	firstAdjective := adjectives[rand.Intn(len(adjectives))]
	firstAdjective[0] = firstAdjective[0] - 32

	secondAdjective := adjectives[rand.Intn(len(adjectives))]
	secondAdjective[0] = secondAdjective[0] - 32

	animal := animals[rand.Intn(len(animals))]
	animal[0] = animal[0] - 32

	id := bytes.Join([][]byte{firstAdjective, secondAdjective, animal}, []byte{})

	return string(id)
}

// UpdateAssets() attempts to pull the latest assets from gfycat
func UpdateAssets() error {
	adjectiveResp, err := http.Get(adjectivesURL)
	if err != nil {
		return err
	}
	defer adjectiveResp.Body.Close()
	if b, err := ioutil.ReadAll(adjectiveResp.Body); err == nil {
		assets.Adjectives = b
	} else {
		return err
	}

	animalResp, err := http.Get(animalsURL)
	if err != nil {
		return err
	}
	defer animalResp.Body.Close()
	if b, err := ioutil.ReadAll(animalResp.Body); err == nil {
		assets.Animals = b
	} else {
		return err
	}

	return nil
}
