package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskFeed is interface of repository
type TaskFeed interface {
	Get(ctx context.Context, where *model.TaskFeedWhereInput) (*model.TaskFeed, error)
	List(ctx context.Context, where *model.TaskFeedWhereInput) ([]*model.TaskFeed, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedWhereInput) (*model.TaskFeedConnection, error)
	Create(ctx context.Context, input model.CreateTaskFeedInput) (*model.TaskFeed, error)
	Update(ctx context.Context, input model.UpdateTaskFeedInput) (*model.TaskFeed, error)
	Delete(ctx context.Context, input model.DeleteTaskFeedInput) (*model.DeleteTaskFeedInputPayload, error)
	Undelete(ctx context.Context, input model.UndeleteTaskFeedInput) (*model.UndeleteTaskFeedInputPayload, error)
}
