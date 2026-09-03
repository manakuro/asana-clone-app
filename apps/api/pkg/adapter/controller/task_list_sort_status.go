package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskListSortStatus is an interface of controller.
type TaskListSortStatus interface {
	Get(ctx context.Context, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatus, error)
	List(ctx context.Context) ([]*model.TaskListSortStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatusConnection, error)
	Create(ctx context.Context, input model.CreateTaskListSortStatusInput) (*model.TaskListSortStatus, error)
	Update(ctx context.Context, input model.UpdateTaskListSortStatusInput) (*model.TaskListSortStatus, error)
}

type taskListSortStatusController struct {
	taskListSortStatusUsecase usecase.TaskListSortStatus
}

// NewTaskListSortStatusController generates taskListSortStatus controller.
func NewTaskListSortStatusController(u usecase.TaskListSortStatus) TaskListSortStatus {
	return &taskListSortStatusController{
		taskListSortStatusUsecase: u,
	}
}

func (c *taskListSortStatusController) Get(ctx context.Context, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatus, error) {
	return c.taskListSortStatusUsecase.Get(ctx, where)
}

func (c *taskListSortStatusController) List(ctx context.Context) ([]*model.TaskListSortStatus, error) {
	return c.taskListSortStatusUsecase.List(ctx)
}

func (c *taskListSortStatusController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatusConnection, error) {
	return c.taskListSortStatusUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskListSortStatusController) Create(ctx context.Context, input model.CreateTaskListSortStatusInput) (*model.TaskListSortStatus, error) {
	return c.taskListSortStatusUsecase.Create(ctx, input)
}

func (c *taskListSortStatusController) Update(ctx context.Context, input model.UpdateTaskListSortStatusInput) (*model.TaskListSortStatus, error) {
	return c.taskListSortStatusUsecase.Update(ctx, input)
}
