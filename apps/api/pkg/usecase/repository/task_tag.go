package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskTag is interface of repository
type TaskTag interface {
	Get(ctx context.Context, where *model.TaskTagWhereInput) (*model.TaskTag, error)
	List(ctx context.Context, where *model.TaskTagWhereInput) ([]*model.TaskTag, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskTagWhereInput) (*model.TaskTagConnection, error)
	Create(ctx context.Context, input model.CreateTaskTagInput) (*model.TaskTag, error)
	Update(ctx context.Context, input model.UpdateTaskTagInput) (*model.TaskTag, error)
	Delete(ctx context.Context, input model.DeleteTaskTagInput) (*model.TaskTag, error)
}
