package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ProjectLightColor is an interface of controller.
type ProjectLightColor interface {
	Get(ctx context.Context, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColor, error)
	List(ctx context.Context) ([]*model.ProjectLightColor, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColorConnection, error)
	Create(ctx context.Context, input model.CreateProjectLightColorInput) (*model.ProjectLightColor, error)
	Update(ctx context.Context, input model.UpdateProjectLightColorInput) (*model.ProjectLightColor, error)
}

type projectLightColorController struct {
	projectLightColorUsecase usecase.ProjectLightColor
}

// NewProjectLightColorController generates projectLightColor controller.
func NewProjectLightColorController(p usecase.ProjectLightColor) ProjectLightColor {
	return &projectLightColorController{
		projectLightColorUsecase: p,
	}
}

func (c *projectLightColorController) Get(ctx context.Context, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColor, error) {
	return c.projectLightColorUsecase.Get(ctx, where)
}

func (c *projectLightColorController) List(ctx context.Context) ([]*model.ProjectLightColor, error) {
	return c.projectLightColorUsecase.List(ctx)
}

func (c *projectLightColorController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColorConnection, error) {
	return c.projectLightColorUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectLightColorController) Create(ctx context.Context, input model.CreateProjectLightColorInput) (*model.ProjectLightColor, error) {
	return c.projectLightColorUsecase.Create(ctx, input)
}

func (c *projectLightColorController) Update(ctx context.Context, input model.UpdateProjectLightColorInput) (*model.ProjectLightColor, error) {
	return c.projectLightColorUsecase.Update(ctx, input)
}
