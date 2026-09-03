package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskLike is interface of repository
type TaskLike interface {
	Get(ctx context.Context, where *model.TaskLikeWhereInput) (*model.TaskLike, error)
	List(ctx context.Context, where *model.TaskLikeWhereInput) ([]*model.TaskLike, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskLikeWhereInput) (*model.TaskLikeConnection, error)
	Create(ctx context.Context, input model.CreateTaskLikeInput) (*model.TaskLike, error)
	Update(ctx context.Context, input model.UpdateTaskLikeInput) (*model.TaskLike, error)
	Delete(ctx context.Context, input model.DeleteTaskLikeInput) (*model.TaskLike, error)
}
