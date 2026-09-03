package middleware

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/infrastructure/router/handler"
	"asana-clone-app/pkg/util/auth"

	"github.com/labstack/echo/v4"
)

// AuthOptions of options for auth
type AuthOptions struct {
	Skip bool
}

// Auth is a middleware of authenticating users
func Auth(opts AuthOptions) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if opts.Skip {
				return next(c)
			}

			ctx := c.Request().Context()

			client, err := auth.NewClient(ctx)
			if err != nil {
				return handler.HandleError(c, model.NewAuthError(err))
			}

			header := c.Request().Header.Get(echo.HeaderAuthorization)
			idToken := auth.GetIDTokenFromBearer(header)
			token, err := client.VerifyIDToken(ctx, idToken)
			if err != nil {
				return handler.HandleError(c, model.NewAuthError(err))
			}

			ctx = auth.WithToken(ctx, token)
			c.SetRequest(c.Request().WithContext(ctx))

			return next(c)
		}
	}
}
