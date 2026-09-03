package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Teammate is interface of repository
type Teammate interface {
	Get(ctx context.Context, id model.ID) (*model.Teammate, error)
	List(ctx context.Context) ([]*model.Teammate, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateWhereInput) (*model.TeammateConnection, error)
	Create(ctx context.Context, input model.CreateTeammateInput) (*model.Teammate, error)
	Update(ctx context.Context, input model.UpdateTeammateInput) (*model.Teammate, error)
}
