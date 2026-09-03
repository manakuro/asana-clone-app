package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// Project is an interface of controller.
type Project interface {
	Get(ctx context.Context, where *model.ProjectWhereInput) (*model.Project, error)
	List(ctx context.Context) ([]*model.Project, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectWhereInput) (*model.ProjectConnection, error)
	Create(ctx context.Context, input model.CreateProjectInput) (*model.Project, error)
	Update(ctx context.Context, input model.UpdateProjectInput) (*model.Project, error)
}

type projectController struct {
	projectUsecase usecase.Project
}

// NewProjectController generates project controller.
func NewProjectController(tu usecase.Project) Project {
	return &projectController{
		projectUsecase: tu,
	}
}

func (c *projectController) Get(ctx context.Context, where *model.ProjectWhereInput) (*model.Project, error) {
	return c.projectUsecase.Get(ctx, where)
}

func (c *projectController) List(ctx context.Context) ([]*model.Project, error) {
	return c.projectUsecase.List(ctx)
}

func (c *projectController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectWhereInput) (*model.ProjectConnection, error) {
	return c.projectUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectController) Create(ctx context.Context, input model.CreateProjectInput) (*model.Project, error) {
	return c.projectUsecase.Create(ctx, input)
}

func (c *projectController) Update(ctx context.Context, input model.UpdateProjectInput) (*model.Project, error) {
	return c.projectUsecase.Update(ctx, input)
}
