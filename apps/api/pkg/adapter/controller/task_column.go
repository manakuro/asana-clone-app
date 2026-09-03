package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskColumn is an interface of controller.
type TaskColumn interface {
	Get(ctx context.Context, where *model.TaskColumnWhereInput) (*model.TaskColumn, error)
	List(ctx context.Context) ([]*model.TaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskColumnWhereInput) (*model.TaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateTaskColumnInput) (*model.TaskColumn, error)
	Update(ctx context.Context, input model.UpdateTaskColumnInput) (*model.TaskColumn, error)
}

type taskColumnController struct {
	taskColumnUsecase usecase.TaskColumn
}

// NewTaskColumnController generates taskColumn controller.
func NewTaskColumnController(pt usecase.TaskColumn) TaskColumn {
	return &taskColumnController{
		taskColumnUsecase: pt,
	}
}

func (c *taskColumnController) Get(ctx context.Context, where *model.TaskColumnWhereInput) (*model.TaskColumn, error) {
	return c.taskColumnUsecase.Get(ctx, where)
}

func (c *taskColumnController) List(ctx context.Context) ([]*model.TaskColumn, error) {
	return c.taskColumnUsecase.List(ctx)
}

func (c *taskColumnController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskColumnWhereInput) (*model.TaskColumnConnection, error) {
	return c.taskColumnUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskColumnController) Create(ctx context.Context, input model.CreateTaskColumnInput) (*model.TaskColumn, error) {
	return c.taskColumnUsecase.Create(ctx, input)
}

func (c *taskColumnController) Update(ctx context.Context, input model.UpdateTaskColumnInput) (*model.TaskColumn, error) {
	return c.taskColumnUsecase.Update(ctx, input)
}
