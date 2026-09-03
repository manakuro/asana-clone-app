package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskFeedLike is an interface of controller.
type TaskFeedLike interface {
	Get(ctx context.Context, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLike, error)
	List(ctx context.Context, where *model.TaskFeedLikeWhereInput) ([]*model.TaskFeedLike, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLikeConnection, error)
	Create(ctx context.Context, input model.CreateTaskFeedLikeInput) (*model.TaskFeedLike, error)
	Update(ctx context.Context, input model.UpdateTaskFeedLikeInput) (*model.TaskFeedLike, error)
	Delete(ctx context.Context, input model.DeleteTaskFeedLikeInput) (*model.TaskFeedLike, error)
}

type taskFeedLikeController struct {
	taskFeedLikeUsecase usecase.TaskFeedLike
}

// NewTaskFeedLikeController generates controller.
func NewTaskFeedLikeController(u usecase.TaskFeedLike) TaskFeedLike {
	return &taskFeedLikeController{
		taskFeedLikeUsecase: u,
	}
}

func (c *taskFeedLikeController) Get(ctx context.Context, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLike, error) {
	return c.taskFeedLikeUsecase.Get(ctx, where)
}

func (c *taskFeedLikeController) List(ctx context.Context, where *model.TaskFeedLikeWhereInput) ([]*model.TaskFeedLike, error) {
	return c.taskFeedLikeUsecase.List(ctx, where)
}

func (c *taskFeedLikeController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLikeConnection, error) {
	return c.taskFeedLikeUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskFeedLikeController) Create(ctx context.Context, input model.CreateTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	return c.taskFeedLikeUsecase.Create(ctx, input)
}

func (c *taskFeedLikeController) Update(ctx context.Context, input model.UpdateTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	return c.taskFeedLikeUsecase.Update(ctx, input)
}

func (c *taskFeedLikeController) Delete(ctx context.Context, input model.DeleteTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	return c.taskFeedLikeUsecase.Delete(ctx, input)
}
