package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ProjectTaskColumn is an interface of controller.
type ProjectTaskColumn interface {
	Get(ctx context.Context, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumn, error)
	List(ctx context.Context) ([]*model.ProjectTaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskColumnInput) (*model.ProjectTaskColumn, error)
	Update(ctx context.Context, input model.UpdateProjectTaskColumnInput) (*model.ProjectTaskColumn, error)
}

type projectTaskColumnController struct {
	projectTaskColumnUsecase usecase.ProjectTaskColumn
}

// NewProjectTaskColumnController generates projectTaskColumn controller.
func NewProjectTaskColumnController(pt usecase.ProjectTaskColumn) ProjectTaskColumn {
	return &projectTaskColumnController{
		projectTaskColumnUsecase: pt,
	}
}

func (c *projectTaskColumnController) Get(ctx context.Context, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumn, error) {
	return c.projectTaskColumnUsecase.Get(ctx, where)
}

func (c *projectTaskColumnController) List(ctx context.Context) ([]*model.ProjectTaskColumn, error) {
	return c.projectTaskColumnUsecase.List(ctx)
}

func (c *projectTaskColumnController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumnConnection, error) {
	return c.projectTaskColumnUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectTaskColumnController) Create(ctx context.Context, input model.CreateProjectTaskColumnInput) (*model.ProjectTaskColumn, error) {
	return c.projectTaskColumnUsecase.Create(ctx, input)
}

func (c *projectTaskColumnController) Update(ctx context.Context, input model.UpdateProjectTaskColumnInput) (*model.ProjectTaskColumn, error) {
	return c.projectTaskColumnUsecase.Update(ctx, input)
}
