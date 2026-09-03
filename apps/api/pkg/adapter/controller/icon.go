package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// Icon is an interface of controller.
type Icon interface {
	Get(ctx context.Context, id model.ID) (*model.Icon, error)
	List(ctx context.Context) ([]*model.Icon, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.IconWhereInput) (*model.IconConnection, error)
	Create(ctx context.Context, input model.CreateIconInput) (*model.Icon, error)
	Update(ctx context.Context, input model.UpdateIconInput) (*model.Icon, error)
}

type iconController struct {
	iconUsecase usecase.Icon
}

// NewIconController generates icon controller.
func NewIconController(tu usecase.Icon) Icon {
	return &iconController{
		iconUsecase: tu,
	}
}

func (c *iconController) Get(ctx context.Context, id model.ID) (*model.Icon, error) {
	return c.iconUsecase.Get(ctx, id)
}

func (c *iconController) List(ctx context.Context) ([]*model.Icon, error) {
	return c.iconUsecase.List(ctx)
}

func (c *iconController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.IconWhereInput) (*model.IconConnection, error) {
	return c.iconUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *iconController) Create(ctx context.Context, input model.CreateIconInput) (*model.Icon, error) {
	return c.iconUsecase.Create(ctx, input)
}

func (c *iconController) Update(ctx context.Context, input model.UpdateIconInput) (*model.Icon, error) {
	return c.iconUsecase.Update(ctx, input)
}
