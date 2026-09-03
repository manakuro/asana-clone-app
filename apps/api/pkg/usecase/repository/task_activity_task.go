package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskActivityTask is interface of repository
type TaskActivityTask interface {
	Get(ctx context.Context, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTask, error)
	List(ctx context.Context) ([]*model.TaskActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateTaskActivityTaskInput) (*model.TaskActivityTask, error)
	Update(ctx context.Context, input model.UpdateTaskActivityTaskInput) (*model.TaskActivityTask, error)
}
