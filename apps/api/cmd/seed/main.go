package main

import (
	"asana-clone-app/cmd/seed/seed"
	"asana-clone-app/config"
)

func main() {
	config.ReadConfig(config.ReadConfigOption{})
	seed.Seed()
}
