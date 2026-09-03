package repositoryutil

import (
	"asana-clone-app/ent"
	"context"
)

// WithTransactionalMutation automatically wrap the GraphQL mutations with a database transaction.
// This allows the ent.Client to commit at the end, or rollback the transaction in case of a GraphQL error.
func WithTransactionalMutation(ctx context.Context) *ent.Client {
	return ent.FromContext(ctx)
}
