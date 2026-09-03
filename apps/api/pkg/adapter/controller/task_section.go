package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskSection is an interface of controller.
type TaskSection interface {
	Get(ctx context.Context, where *model.TaskSectionWhereInput) (*model.TaskSection, error)
	List(ctx context.Context) ([]*model.TaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskSectionWhereInput) (*model.TaskSectionConnection, error)
	Create(ctx context.Context, input model.CreateTaskSectionInput) (*model.TaskSection, error)
	Update(ctx context.Context, input model.UpdateTaskSectionInput) (*model.TaskSection, error)
}

type taskSectionController struct {
	taskSectionUsecase usecase.TaskSection
}

// NewTaskSectionController generates taskSection controller.
func NewTaskSectionController(pt usecase.TaskSection) TaskSection {
	return &taskSectionController{
		taskSectionUsecase: pt,
	}
}

func (c *taskSectionController) Get(ctx context.Context, where *model.TaskSectionWhereInput) (*model.TaskSection, error) {
	return c.taskSectionUsecase.Get(ctx, where)
}

func (c *taskSectionController) List(ctx context.Context) ([]*model.TaskSection, error) {
	return c.taskSectionUsecase.List(ctx)
}

func (c *taskSectionController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskSectionWhereInput) (*model.TaskSectionConnection, error) {
	return c.taskSectionUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskSectionController) Create(ctx context.Context, input model.CreateTaskSectionInput) (*model.TaskSection, error) {
	return c.taskSectionUsecase.Create(ctx, input)
}

func (c *taskSectionController) Update(ctx context.Context, input model.UpdateTaskSectionInput) (*model.TaskSection, error) {
	return c.taskSectionUsecase.Update(ctx, input)
}
