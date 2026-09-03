package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Color is interface of repository
type Color interface {
	Get(ctx context.Context, id model.ID) (*model.Color, error)
	List(ctx context.Context) ([]*model.Color, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ColorWhereInput) (*model.ColorConnection, error)
	Create(ctx context.Context, input model.CreateColorInput) (*model.Color, error)
	Update(ctx context.Context, input model.UpdateColorInput) (*model.Color, error)
}
