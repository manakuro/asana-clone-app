package graphql

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/resolver"
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/util/auth"
	"context"
	"time"

	"entgo.io/contrib/entgql"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	coderws "github.com/coder/websocket"
	"github.com/vektah/gqlparser/v2/ast"
)

// NewServer generates graphql server
func NewServer(client *ent.Client, controller controller.Controller) *handler.Server {
	// Add extensions to error
	// @see https://github.com/99designs/gqlgen/issues/1354
	srv := handler.New(resolver.NewSchema(client, controller))

	// Configure WebSocket with CORS
	srv.AddTransport(&transport.Websocket{
		Implementation: transport.CoderWebsocketImplementation{
			AcceptOptions: coderws.AcceptOptions{
				InsecureSkipVerify: true, // Equivalent to CheckOrigin returning true
			},
		},
		KeepAlivePingInterval: 10 * time.Second,
		InitFunc: func(ctx context.Context, initPayload transport.InitPayload) (context.Context, *transport.InitPayload, error) {
			authClient, err := auth.NewClient(ctx)
			if err != nil {
				return ctx, nil, model.NewAuthError(err)
			}

			authorization := initPayload.Authorization()
			idToken := auth.GetIDTokenFromBearer(authorization)
			token, err := authClient.VerifyIDToken(ctx, idToken)
			if err != nil {
				return ctx, nil, model.NewAuthError(err)
			}

			ctx = auth.WithToken(ctx, token)

			return ctx, nil, nil
		},
	})

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	srv.Use(entgql.Transactioner{TxOpener: client})

	return srv
}
