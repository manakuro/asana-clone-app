package auth

import (
	"context"
	"errors"
	"strings"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"

	"asana-clone-app/config"
	"asana-clone-app/pkg/entity/model"
)

type key string

const (
	// TokenKey is a key of user token.
	TokenKey key = "token"
)

// TokenID retrieve a token from context.
func TokenID(ctx context.Context) (string, error) {
	val := ctx.Value(TokenKey)

	t, ok := val.(*auth.Token)
	if !ok {
		return "", model.NewAuthError(errors.New("token is invalid type"))
	}

	tokenID := t.UID

	if tokenID == "" {
		return "", model.NewAuthError(errors.New("token is empty"))
	}

	return tokenID, nil
}

// NewClient returns auth client
func NewClient(ctx context.Context) (*auth.Client, error) {
	opt := option.WithCredentialsFile(config.C.Firebase.ServiceKey)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return nil, model.NewInternalServerError(err)
	}

	a, err := app.Auth(ctx)
	if err != nil {
		return nil, model.NewAuthError(err)
	}

	return a, nil
}

// GetIDTokenFromBearer gets id token from Bearer string.
func GetIDTokenFromBearer(str string) string {
	return strings.TrimSpace(strings.Replace(str, "Bearer", "", 1))
}

// WithToken sets token data to context.
func WithToken(ctx context.Context, token *auth.Token) context.Context {
	return context.WithValue(ctx, TokenKey, token)
}
