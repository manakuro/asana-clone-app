package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// Teammate is an interface of controller.
type Teammate interface {
	Get(ctx context.Context, id model.ID) (*model.Teammate, error)
	List(ctx context.Context) ([]*model.Teammate, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateWhereInput) (*model.TeammateConnection, error)
	Create(ctx context.Context, input model.CreateTeammateInput) (*model.Teammate, error)
	Update(ctx context.Context, input model.UpdateTeammateInput) (*model.Teammate, error)
}

type teammateController struct {
	teammateUsecase usecase.Teammate
}

// NewTeammateController generates teammateController controller.
func NewTeammateController(tu usecase.Teammate) Teammate {
	return &teammateController{
		teammateUsecase: tu,
	}
}

func (c *teammateController) Get(ctx context.Context, id model.ID) (*model.Teammate, error) {
	return c.teammateUsecase.Get(ctx, id)
}

func (c *teammateController) List(ctx context.Context) ([]*model.Teammate, error) {
	return c.teammateUsecase.List(ctx)
}

func (c *teammateController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateWhereInput) (*model.TeammateConnection, error) {
	return c.teammateUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *teammateController) Create(ctx context.Context, input model.CreateTeammateInput) (*model.Teammate, error) {
	return c.teammateUsecase.Create(ctx, input)
}

func (c *teammateController) Update(ctx context.Context, input model.UpdateTeammateInput) (*model.Teammate, error) {
	return c.teammateUsecase.Update(ctx, input)
}
