package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Tag is interface of repository
type Tag interface {
	Get(ctx context.Context, where *model.TagWhereInput) (*model.Tag, error)
	List(ctx context.Context) ([]*model.Tag, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TagWhereInput) (*model.TagConnection, error)
	Create(ctx context.Context, input model.CreateTagInput) (*model.Tag, error)
	Update(ctx context.Context, input model.UpdateTagInput) (*model.Tag, error)
}
