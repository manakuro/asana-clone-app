package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskActivityTask is an interface of controller.
type TaskActivityTask interface {
	Get(ctx context.Context, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTask, error)
	List(ctx context.Context) ([]*model.TaskActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateTaskActivityTaskInput) (*model.TaskActivityTask, error)
	Update(ctx context.Context, input model.UpdateTaskActivityTaskInput) (*model.TaskActivityTask, error)
}

type taskActivityTaskController struct {
	taskActivityTaskUsecase usecase.TaskActivityTask
}

// NewTaskActivityTaskController generates taskActivityTask controller.
func NewTaskActivityTaskController(pt usecase.TaskActivityTask) TaskActivityTask {
	return &taskActivityTaskController{
		taskActivityTaskUsecase: pt,
	}
}

func (c *taskActivityTaskController) Get(ctx context.Context, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTask, error) {
	return c.taskActivityTaskUsecase.Get(ctx, where)
}

func (c *taskActivityTaskController) List(ctx context.Context) ([]*model.TaskActivityTask, error) {
	return c.taskActivityTaskUsecase.List(ctx)
}

func (c *taskActivityTaskController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTaskConnection, error) {
	return c.taskActivityTaskUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskActivityTaskController) Create(ctx context.Context, input model.CreateTaskActivityTaskInput) (*model.TaskActivityTask, error) {
	return c.taskActivityTaskUsecase.Create(ctx, input)
}

func (c *taskActivityTaskController) Update(ctx context.Context, input model.UpdateTaskActivityTaskInput) (*model.TaskActivityTask, error) {
	return c.taskActivityTaskUsecase.Update(ctx, input)
}
