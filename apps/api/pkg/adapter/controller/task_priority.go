package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskPriority is an interface of controller.
type TaskPriority interface {
	Get(ctx context.Context, where *model.TaskPriorityWhereInput) (*model.TaskPriority, error)
	List(ctx context.Context) ([]*model.TaskPriority, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskPriorityWhereInput) (*model.TaskPriorityConnection, error)
	Create(ctx context.Context, input model.CreateTaskPriorityInput) (*model.TaskPriority, error)
	Update(ctx context.Context, input model.UpdateTaskPriorityInput) (*model.TaskPriority, error)
}

type taskPriorityController struct {
	taskPriorityUsecase usecase.TaskPriority
}

// NewTaskPriorityController generates taskPriority controller.
func NewTaskPriorityController(pt usecase.TaskPriority) TaskPriority {
	return &taskPriorityController{
		taskPriorityUsecase: pt,
	}
}

func (c *taskPriorityController) Get(ctx context.Context, where *model.TaskPriorityWhereInput) (*model.TaskPriority, error) {
	return c.taskPriorityUsecase.Get(ctx, where)
}

func (c *taskPriorityController) List(ctx context.Context) ([]*model.TaskPriority, error) {
	return c.taskPriorityUsecase.List(ctx)
}

func (c *taskPriorityController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskPriorityWhereInput) (*model.TaskPriorityConnection, error) {
	return c.taskPriorityUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskPriorityController) Create(ctx context.Context, input model.CreateTaskPriorityInput) (*model.TaskPriority, error) {
	return c.taskPriorityUsecase.Create(ctx, input)
}

func (c *taskPriorityController) Update(ctx context.Context, input model.UpdateTaskPriorityInput) (*model.TaskPriority, error) {
	return c.taskPriorityUsecase.Update(ctx, input)
}
