package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ArchivedTaskActivity is interface of repository
type ArchivedTaskActivity interface {
	Get(ctx context.Context, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivity, error)
	List(ctx context.Context) ([]*model.ArchivedTaskActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivityConnection, error)
	Create(ctx context.Context, input model.CreateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error)
	Update(ctx context.Context, input model.UpdateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error)
}
