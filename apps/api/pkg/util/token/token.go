// Package token provides utilities for generating and validating tokens.
package token

import "github.com/thanhpk/randstr"

// Hex16 generates a random hex string with length of 16.
func Hex16() string {
	return randstr.Hex(16)
}
