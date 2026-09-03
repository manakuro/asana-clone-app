package testutil

import (
	"asana-clone-app/config"
)

// ReadConfig reads config file for test.
func ReadConfig() {
	config.ReadConfig(config.ReadConfigOption{
		AppEnv: config.Test,
	})
}

// ReadConfigE2E reads config file for e2e.
func ReadConfigE2E() {
	config.ReadConfig(config.ReadConfigOption{
		AppEnv: config.E2E,
	})
}
