package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskFeedLike is interface of repository
type TaskFeedLike interface {
	Get(ctx context.Context, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLike, error)
	List(ctx context.Context, where *model.TaskFeedLikeWhereInput) ([]*model.TaskFeedLike, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLikeConnection, error)
	Create(ctx context.Context, input model.CreateTaskFeedLikeInput) (*model.TaskFeedLike, error)
	Update(ctx context.Context, input model.UpdateTaskFeedLikeInput) (*model.TaskFeedLike, error)
	Delete(ctx context.Context, input model.DeleteTaskFeedLikeInput) (*model.TaskFeedLike, error)
}
