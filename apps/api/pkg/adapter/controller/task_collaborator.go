package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskCollaborator is an interface of controller.
type TaskCollaborator interface {
	Get(ctx context.Context, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaborator, error)
	List(ctx context.Context, where *model.TaskCollaboratorWhereInput) ([]*model.TaskCollaborator, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaboratorConnection, error)
	Create(ctx context.Context, input model.CreateTaskCollaboratorInput) (*model.TaskCollaborator, error)
	Update(ctx context.Context, input model.UpdateTaskCollaboratorInput) (*model.TaskCollaborator, error)
	Delete(ctx context.Context, input model.DeleteTaskCollaboratorInput) (*model.TaskCollaborator, error)
}

type taskCollaboratorController struct {
	taskCollaboratorUsecase usecase.TaskCollaborator
}

// NewTaskCollaboratorController generates controller.
func NewTaskCollaboratorController(u usecase.TaskCollaborator) TaskCollaborator {
	return &taskCollaboratorController{
		taskCollaboratorUsecase: u,
	}
}

func (c *taskCollaboratorController) Get(ctx context.Context, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaborator, error) {
	return c.taskCollaboratorUsecase.Get(ctx, where)
}

func (c *taskCollaboratorController) List(ctx context.Context, where *model.TaskCollaboratorWhereInput) ([]*model.TaskCollaborator, error) {
	return c.taskCollaboratorUsecase.List(ctx, where)
}

func (c *taskCollaboratorController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaboratorConnection, error) {
	return c.taskCollaboratorUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskCollaboratorController) Create(ctx context.Context, input model.CreateTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	return c.taskCollaboratorUsecase.Create(ctx, input)
}

func (c *taskCollaboratorController) Update(ctx context.Context, input model.UpdateTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	return c.taskCollaboratorUsecase.Update(ctx, input)
}

func (c *taskCollaboratorController) Delete(ctx context.Context, input model.DeleteTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	return c.taskCollaboratorUsecase.Delete(ctx, input)
}
