package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TeammateTaskColumn is an interface of controller.
type TeammateTaskColumn interface {
	Get(ctx context.Context, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumn, error)
	List(ctx context.Context) ([]*model.TeammateTaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error)
	UpdateOrder(ctx context.Context, input model.UpdateTeammateTaskColumnOrderInput) ([]*model.TeammateTaskColumn, error)
}

type teammateTaskColumnController struct {
	teammateTaskColumnUsecase usecase.TeammateTaskColumn
}

// NewTeammateTaskColumnController generates teammateTaskColumnController controller.
func NewTeammateTaskColumnController(pt usecase.TeammateTaskColumn) TeammateTaskColumn {
	return &teammateTaskColumnController{
		teammateTaskColumnUsecase: pt,
	}
}

func (c *teammateTaskColumnController) Get(ctx context.Context, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumn, error) {
	return c.teammateTaskColumnUsecase.Get(ctx, where)
}

func (c *teammateTaskColumnController) List(ctx context.Context) ([]*model.TeammateTaskColumn, error) {
	return c.teammateTaskColumnUsecase.List(ctx)
}

func (c *teammateTaskColumnController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumnConnection, error) {
	return c.teammateTaskColumnUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *teammateTaskColumnController) Create(ctx context.Context, input model.CreateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error) {
	return c.teammateTaskColumnUsecase.Create(ctx, input)
}

func (c *teammateTaskColumnController) Update(ctx context.Context, input model.UpdateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error) {
	return c.teammateTaskColumnUsecase.Update(ctx, input)
}

func (c *teammateTaskColumnController) UpdateOrder(ctx context.Context, input model.UpdateTeammateTaskColumnOrderInput) ([]*model.TeammateTaskColumn, error) {
	return c.teammateTaskColumnUsecase.UpdateOrder(ctx, input)
}
