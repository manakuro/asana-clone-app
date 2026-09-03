package router

import (
	"asana-clone-app/pkg/adapter/controller"
	rm "asana-clone-app/pkg/infrastructure/router/middleware"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

const (
	apiPath                 = "api"
	graphQLPath             = "/graphql"
	graphQLPlaygroundPath   = "/graphql_playground"
	subscriptionPath        = "/subscription"
	playgroundPath          = "/playground"
	revokeRefreshTokensPath = "/revoke_refresh_tokens"
	seedTable               = "/seedTable"
)

// GraphQLPath is an endpoint of graphql server.
const (
	GraphQLPath = "/" + apiPath + graphQLPath
)

// Options of router
type Options struct {
	Auth bool
}

// New creates route endpoint
func New(srv *handler.Server, ctrl controller.Controller, options Options) *echo.Echo {
	e := echo.New()
	//e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodOptions},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderXRequestedWith, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	e.File("/favicon.ico", "favicon.ico")

	e.GET("/readiness_check", func(c echo.Context) error {
		return c.String(http.StatusOK, "ok")
	})

	g := e.Group(apiPath)
	{
		g.POST(revokeRefreshTokensPath, func(c echo.Context) error { return ctrl.Auth.RevokeRefreshTokens(c) })
	}

	{
		g.GET(seedTable, func(c echo.Context) error { return ctrl.Database.SeedTable(c) })
	}

	{
		graphQLHandler := echo.WrapHandler(srv)
		authMiddleware := rm.Auth(rm.AuthOptions{
			Skip: !options.Auth,
		})
		g.POST(graphQLPath, graphQLHandler, authMiddleware)
		g.GET(graphQLPath, graphQLHandler, authMiddleware)

		g.POST(graphQLPlaygroundPath, echo.WrapHandler(srv))

		g.GET(subscriptionPath, echo.WrapHandler(srv))

		e.GET(playgroundPath, func(c echo.Context) error {
			playground.Handler("GraphQL", "/"+apiPath+graphQLPlaygroundPath).ServeHTTP(c.Response(), c.Request())
			return nil
		})
	}

	return e
}
