package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskFile is an interface of controller.
type TaskFile interface {
	Get(ctx context.Context, where *model.TaskFileWhereInput) (*model.TaskFile, error)
	List(ctx context.Context) ([]*model.TaskFile, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFileWhereInput) (*model.TaskFileConnection, error)
	Create(ctx context.Context, input model.CreateTaskFileInput) (*model.TaskFile, error)
	Update(ctx context.Context, input model.UpdateTaskFileInput) (*model.TaskFile, error)
}

type taskFileController struct {
	taskFileUsecase usecase.TaskFile
}

// NewTaskFileController generates taskFile controller.
func NewTaskFileController(pt usecase.TaskFile) TaskFile {
	return &taskFileController{
		taskFileUsecase: pt,
	}
}

func (c *taskFileController) Get(ctx context.Context, where *model.TaskFileWhereInput) (*model.TaskFile, error) {
	return c.taskFileUsecase.Get(ctx, where)
}

func (c *taskFileController) List(ctx context.Context) ([]*model.TaskFile, error) {
	return c.taskFileUsecase.List(ctx)
}

func (c *taskFileController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFileWhereInput) (*model.TaskFileConnection, error) {
	return c.taskFileUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskFileController) Create(ctx context.Context, input model.CreateTaskFileInput) (*model.TaskFile, error) {
	return c.taskFileUsecase.Create(ctx, input)
}

func (c *taskFileController) Update(ctx context.Context, input model.UpdateTaskFileInput) (*model.TaskFile, error) {
	return c.taskFileUsecase.Update(ctx, input)
}
