package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskLike is an interface of controller.
type TaskLike interface {
	Get(ctx context.Context, where *model.TaskLikeWhereInput) (*model.TaskLike, error)
	List(ctx context.Context, where *model.TaskLikeWhereInput) ([]*model.TaskLike, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskLikeWhereInput) (*model.TaskLikeConnection, error)
	Create(ctx context.Context, input model.CreateTaskLikeInput) (*model.TaskLike, error)
	Update(ctx context.Context, input model.UpdateTaskLikeInput) (*model.TaskLike, error)
	Delete(ctx context.Context, input model.DeleteTaskLikeInput) (*model.TaskLike, error)
}

type taskLikeController struct {
	taskLikeUsecase usecase.TaskLike
}

// NewTaskLikeController generates controller.
func NewTaskLikeController(u usecase.TaskLike) TaskLike {
	return &taskLikeController{
		taskLikeUsecase: u,
	}
}

func (c *taskLikeController) Get(ctx context.Context, where *model.TaskLikeWhereInput) (*model.TaskLike, error) {
	return c.taskLikeUsecase.Get(ctx, where)
}

func (c *taskLikeController) List(ctx context.Context, where *model.TaskLikeWhereInput) ([]*model.TaskLike, error) {
	return c.taskLikeUsecase.List(ctx, where)
}

func (c *taskLikeController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskLikeWhereInput) (*model.TaskLikeConnection, error) {
	return c.taskLikeUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskLikeController) Create(ctx context.Context, input model.CreateTaskLikeInput) (*model.TaskLike, error) {
	return c.taskLikeUsecase.Create(ctx, input)
}

func (c *taskLikeController) Update(ctx context.Context, input model.UpdateTaskLikeInput) (*model.TaskLike, error) {
	return c.taskLikeUsecase.Update(ctx, input)
}

func (c *taskLikeController) Delete(ctx context.Context, input model.DeleteTaskLikeInput) (*model.TaskLike, error) {
	return c.taskLikeUsecase.Delete(ctx, input)
}
