package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskActivity is an interface of controller.
type TaskActivity interface {
	Get(ctx context.Context, where *model.TaskActivityWhereInput) (*model.TaskActivity, error)
	List(ctx context.Context) ([]*model.TaskActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityWhereInput) (*model.TaskActivityConnection, error)
	Create(ctx context.Context, input model.CreateTaskActivityInput) (*model.TaskActivity, error)
	Update(ctx context.Context, input model.UpdateTaskActivityInput) (*model.TaskActivity, error)
}

type taskActivityController struct {
	taskActivityUsecase usecase.TaskActivity
}

// NewTaskActivityController generates taskActivity controller.
func NewTaskActivityController(pt usecase.TaskActivity) TaskActivity {
	return &taskActivityController{
		taskActivityUsecase: pt,
	}
}

func (c *taskActivityController) Get(ctx context.Context, where *model.TaskActivityWhereInput) (*model.TaskActivity, error) {
	return c.taskActivityUsecase.Get(ctx, where)
}

func (c *taskActivityController) List(ctx context.Context) ([]*model.TaskActivity, error) {
	return c.taskActivityUsecase.List(ctx)
}

func (c *taskActivityController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityWhereInput) (*model.TaskActivityConnection, error) {
	return c.taskActivityUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskActivityController) Create(ctx context.Context, input model.CreateTaskActivityInput) (*model.TaskActivity, error) {
	return c.taskActivityUsecase.Create(ctx, input)
}

func (c *taskActivityController) Update(ctx context.Context, input model.UpdateTaskActivityInput) (*model.TaskActivity, error) {
	return c.taskActivityUsecase.Update(ctx, input)
}
