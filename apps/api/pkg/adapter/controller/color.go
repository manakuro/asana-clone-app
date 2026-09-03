package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// Color is an interface of controller.
type Color interface {
	Get(ctx context.Context, id model.ID) (*model.Color, error)
	List(ctx context.Context) ([]*model.Color, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ColorWhereInput) (*model.ColorConnection, error)
	Create(ctx context.Context, input model.CreateColorInput) (*model.Color, error)
	Update(ctx context.Context, input model.UpdateColorInput) (*model.Color, error)
}

type colorController struct {
	colorUsecase usecase.Color
}

// NewColorController generates color controller.
func NewColorController(tu usecase.Color) Color {
	return &colorController{
		colorUsecase: tu,
	}
}

func (c *colorController) Get(ctx context.Context, id model.ID) (*model.Color, error) {
	return c.colorUsecase.Get(ctx, id)
}

func (c *colorController) List(ctx context.Context) ([]*model.Color, error) {
	return c.colorUsecase.List(ctx)
}

func (c *colorController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ColorWhereInput) (*model.ColorConnection, error) {
	return c.colorUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *colorController) Create(ctx context.Context, input model.CreateColorInput) (*model.Color, error) {
	return c.colorUsecase.Create(ctx, input)
}

func (c *colorController) Update(ctx context.Context, input model.UpdateColorInput) (*model.Color, error) {
	return c.colorUsecase.Update(ctx, input)
}
