package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ArchivedTaskActivityTask is interface of repository
type ArchivedTaskActivityTask interface {
	Get(ctx context.Context, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTask, error)
	List(ctx context.Context) ([]*model.ArchivedTaskActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error)
	Update(ctx context.Context, input model.UpdateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error)
}
