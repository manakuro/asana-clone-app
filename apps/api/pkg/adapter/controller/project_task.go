package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ProjectTask is an interface of controller.
type ProjectTask interface {
	Get(ctx context.Context, where *model.ProjectTaskWhereInput) (*model.ProjectTask, error)
	List(ctx context.Context) ([]*model.ProjectTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskWhereInput) (*model.ProjectTaskConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskInput) (*model.ProjectTask, error)
	CreateByTaskID(ctx context.Context, input model.CreateProjectTaskByTaskIDInput) (*model.ProjectTask, error)
	Update(ctx context.Context, input model.UpdateProjectTaskInput) (*model.ProjectTask, error)
	Delete(ctx context.Context, input model.DeleteProjectTaskInput) (*model.ProjectTask, error)
}

type projectTaskController struct {
	projectTaskUsecase usecase.ProjectTask
}

// NewProjectTaskController generates controller.
func NewProjectTaskController(u usecase.ProjectTask) ProjectTask {
	return &projectTaskController{
		projectTaskUsecase: u,
	}
}

func (c *projectTaskController) Get(ctx context.Context, where *model.ProjectTaskWhereInput) (*model.ProjectTask, error) {
	return c.projectTaskUsecase.Get(ctx, where)
}

func (c *projectTaskController) List(ctx context.Context) ([]*model.ProjectTask, error) {
	return c.projectTaskUsecase.List(ctx)
}

func (c *projectTaskController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskWhereInput) (*model.ProjectTaskConnection, error) {
	return c.projectTaskUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectTaskController) Create(ctx context.Context, input model.CreateProjectTaskInput) (*model.ProjectTask, error) {
	return c.projectTaskUsecase.Create(ctx, input)
}

func (c *projectTaskController) CreateByTaskID(ctx context.Context, input model.CreateProjectTaskByTaskIDInput) (*model.ProjectTask, error) {
	return c.projectTaskUsecase.CreateByTaskID(ctx, input)
}

func (c *projectTaskController) Update(ctx context.Context, input model.UpdateProjectTaskInput) (*model.ProjectTask, error) {
	return c.projectTaskUsecase.Update(ctx, input)
}

func (c *projectTaskController) Delete(ctx context.Context, input model.DeleteProjectTaskInput) (*model.ProjectTask, error) {
	return c.projectTaskUsecase.Delete(ctx, input)
}
