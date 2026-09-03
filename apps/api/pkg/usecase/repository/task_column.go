package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskColumn is interface of repository
type TaskColumn interface {
	Get(ctx context.Context, where *model.TaskColumnWhereInput) (*model.TaskColumn, error)
	List(ctx context.Context) ([]*model.TaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskColumnWhereInput) (*model.TaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateTaskColumnInput) (*model.TaskColumn, error)
	Update(ctx context.Context, input model.UpdateTaskColumnInput) (*model.TaskColumn, error)
}
