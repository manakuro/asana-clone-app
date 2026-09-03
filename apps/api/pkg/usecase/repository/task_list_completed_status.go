package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskListCompletedStatus is interface of repository
type TaskListCompletedStatus interface {
	Get(ctx context.Context, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatus, error)
	List(ctx context.Context) ([]*model.TaskListCompletedStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatusConnection, error)
	Create(ctx context.Context, input model.CreateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error)
	Update(ctx context.Context, input model.UpdateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error)
}
