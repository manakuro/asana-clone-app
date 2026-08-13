// Package environment provides utilities for reading environment configuration.
package environment

import (
	"project-management-demo-backend/config"
)

// IsDev returns APP_ENV in development mode
func IsDev() bool {
	return config.C.AppEnv == config.Development
}

// IsTest returns APP_ENV in test mode
func IsTest() bool {
	return config.C.AppEnv == config.Test
}

// IsE2E returns APP_ENV in e2e mode
func IsE2E() bool {
	return config.C.AppEnv == config.E2E
}
