package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ProjectBaseColor is an interface of controller.
type ProjectBaseColor interface {
	Get(ctx context.Context, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColor, error)
	List(ctx context.Context) ([]*model.ProjectBaseColor, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColorConnection, error)
	Create(ctx context.Context, input model.CreateProjectBaseColorInput) (*model.ProjectBaseColor, error)
	Update(ctx context.Context, input model.UpdateProjectBaseColorInput) (*model.ProjectBaseColor, error)
}

type projectBaseColorController struct {
	projectBaseColorUsecase usecase.ProjectBaseColor
}

// NewProjectBaseColorController generates projectBaseColor controller.
func NewProjectBaseColorController(p usecase.ProjectBaseColor) ProjectBaseColor {
	return &projectBaseColorController{
		projectBaseColorUsecase: p,
	}
}

func (c *projectBaseColorController) Get(ctx context.Context, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColor, error) {
	return c.projectBaseColorUsecase.Get(ctx, where)
}

func (c *projectBaseColorController) List(ctx context.Context) ([]*model.ProjectBaseColor, error) {
	return c.projectBaseColorUsecase.List(ctx)
}

func (c *projectBaseColorController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColorConnection, error) {
	return c.projectBaseColorUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectBaseColorController) Create(ctx context.Context, input model.CreateProjectBaseColorInput) (*model.ProjectBaseColor, error) {
	return c.projectBaseColorUsecase.Create(ctx, input)
}

func (c *projectBaseColorController) Update(ctx context.Context, input model.UpdateProjectBaseColorInput) (*model.ProjectBaseColor, error) {
	return c.projectBaseColorUsecase.Update(ctx, input)
}
