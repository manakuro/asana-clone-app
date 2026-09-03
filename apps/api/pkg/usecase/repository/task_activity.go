package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskActivity is interface of repository
type TaskActivity interface {
	Get(ctx context.Context, where *model.TaskActivityWhereInput) (*model.TaskActivity, error)
	List(ctx context.Context) ([]*model.TaskActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityWhereInput) (*model.TaskActivityConnection, error)
	Create(ctx context.Context, input model.CreateTaskActivityInput) (*model.TaskActivity, error)
	Update(ctx context.Context, input model.UpdateTaskActivityInput) (*model.TaskActivity, error)
}
