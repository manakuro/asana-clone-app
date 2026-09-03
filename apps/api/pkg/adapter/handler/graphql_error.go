package handler

import (
	"asana-clone-app/pkg/entity/model"
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// HandleGraphQLError tasks any errors and add it to the graphql errors.
// It is basically intended to be used at the adapter/resolver layer
func HandleGraphQLError(ctx context.Context, err error) error {
	var extendedError interface{ Extensions() map[string]interface{} }

	for err != nil {
		u, ok := err.(interface {
			Unwrap() error
		})
		if !ok {
			break
		}

		// Skip when its stack strace
		if model.IsStackTrace(err) {
			err = u.Unwrap()
			continue
		}

		// Skip when it's not the standard error type
		if !model.IsError(err) {
			err = u.Unwrap()
			continue
		}

		gqlerr := &gqlerror.Error{
			Path:    graphql.GetPath(ctx),
			Message: err.Error(),
		}
		if errors.As(err, &extendedError) {
			gqlerr.Extensions = extendedError.Extensions()
		}

		graphql.AddError(ctx, gqlerr)

		err = u.Unwrap()
	}

	return nil
}
