package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskPriority is interface of repository
type TaskPriority interface {
	Get(ctx context.Context, where *model.TaskPriorityWhereInput) (*model.TaskPriority, error)
	List(ctx context.Context) ([]*model.TaskPriority, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskPriorityWhereInput) (*model.TaskPriorityConnection, error)
	Create(ctx context.Context, input model.CreateTaskPriorityInput) (*model.TaskPriority, error)
	Update(ctx context.Context, input model.UpdateTaskPriorityInput) (*model.TaskPriority, error)
}
