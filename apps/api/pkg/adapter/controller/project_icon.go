package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ProjectIcon is an interface of controller.
type ProjectIcon interface {
	Get(ctx context.Context, where *model.ProjectIconWhereInput) (*model.ProjectIcon, error)
	List(ctx context.Context) ([]*model.ProjectIcon, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectIconWhereInput) (*model.ProjectIconConnection, error)
	Create(ctx context.Context, input model.CreateProjectIconInput) (*model.ProjectIcon, error)
	Update(ctx context.Context, input model.UpdateProjectIconInput) (*model.ProjectIcon, error)
}

type projectIconController struct {
	projectIconUsecase usecase.ProjectIcon
}

// NewProjectIconController generates projectIcon controller.
func NewProjectIconController(p usecase.ProjectIcon) ProjectIcon {
	return &projectIconController{
		projectIconUsecase: p,
	}
}

func (c *projectIconController) Get(ctx context.Context, where *model.ProjectIconWhereInput) (*model.ProjectIcon, error) {
	return c.projectIconUsecase.Get(ctx, where)
}

func (c *projectIconController) List(ctx context.Context) ([]*model.ProjectIcon, error) {
	return c.projectIconUsecase.List(ctx)
}

func (c *projectIconController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectIconWhereInput) (*model.ProjectIconConnection, error) {
	return c.projectIconUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectIconController) Create(ctx context.Context, input model.CreateProjectIconInput) (*model.ProjectIcon, error) {
	return c.projectIconUsecase.Create(ctx, input)
}

func (c *projectIconController) Update(ctx context.Context, input model.UpdateProjectIconInput) (*model.ProjectIcon, error) {
	return c.projectIconUsecase.Update(ctx, input)
}
