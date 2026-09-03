package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskSection is interface of repository
type TaskSection interface {
	Get(ctx context.Context, where *model.TaskSectionWhereInput) (*model.TaskSection, error)
	List(ctx context.Context) ([]*model.TaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskSectionWhereInput) (*model.TaskSectionConnection, error)
	Create(ctx context.Context, input model.CreateTaskSectionInput) (*model.TaskSection, error)
	Update(ctx context.Context, input model.UpdateTaskSectionInput) (*model.TaskSection, error)
}
