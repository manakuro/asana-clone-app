package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TeammateTaskTabStatus is an interface of controller.
type TeammateTaskTabStatus interface {
	Get(ctx context.Context, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatus, error)
	List(ctx context.Context) ([]*model.TeammateTaskTabStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatusConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error)
}

type teammateTaskTabStatusController struct {
	teammateTaskTabStatusUsecase usecase.TeammateTaskTabStatus
}

// NewTeammateTaskTabStatusController generates teammateTaskTabStatus controller.
func NewTeammateTaskTabStatusController(pt usecase.TeammateTaskTabStatus) TeammateTaskTabStatus {
	return &teammateTaskTabStatusController{
		teammateTaskTabStatusUsecase: pt,
	}
}

func (c *teammateTaskTabStatusController) Get(ctx context.Context, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatus, error) {
	return c.teammateTaskTabStatusUsecase.Get(ctx, where)
}

func (c *teammateTaskTabStatusController) List(ctx context.Context) ([]*model.TeammateTaskTabStatus, error) {
	return c.teammateTaskTabStatusUsecase.List(ctx)
}

func (c *teammateTaskTabStatusController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatusConnection, error) {
	return c.teammateTaskTabStatusUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *teammateTaskTabStatusController) Create(ctx context.Context, input model.CreateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error) {
	return c.teammateTaskTabStatusUsecase.Create(ctx, input)
}

func (c *teammateTaskTabStatusController) Update(ctx context.Context, input model.UpdateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error) {
	return c.teammateTaskTabStatusUsecase.Update(ctx, input)
}
