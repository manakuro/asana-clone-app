package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskListSortStatus is interface of repository
type TaskListSortStatus interface {
	Get(ctx context.Context, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatus, error)
	List(ctx context.Context) ([]*model.TaskListSortStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatusConnection, error)
	Create(ctx context.Context, input model.CreateTaskListSortStatusInput) (*model.TaskListSortStatus, error)
	Update(ctx context.Context, input model.UpdateTaskListSortStatusInput) (*model.TaskListSortStatus, error)
}
