# gfycatid

This is a quick and dirty random id generator that uses [gfycats](https://gfycat.com) method of generating human readable IDs in the form `AdjectiveAdjectiveAnimal`.

## Requirements

gfycatid requires [Golang](https://golang.org) version 1.5 or greater.

## Installation

	$ go get github.com/ilsiepotamus/gfycatid

## Example

```go
package main

import (
	"fmt"
	"github.com/ilsiepotamus/gfycatid"
)

func main() {
	// Update the static assets with anything new that gfycat might have made public
	err := gfycatid.UpdateAssets()
	if err != nil {
		fmt.Println("Assets could not be updated.  Using the static assets.")
	}

	// Create a new ID
	id := gfycatid.New()
	fmt.Println("gfycat ID is: ", id)
}
```
