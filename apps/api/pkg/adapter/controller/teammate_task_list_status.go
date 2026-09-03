package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TeammateTaskListStatus is an interface of controller.
type TeammateTaskListStatus interface {
	Get(ctx context.Context, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatus, error)
	List(ctx context.Context) ([]*model.TeammateTaskListStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatusConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error)
}

type teammateTaskListStatusController struct {
	teammateTaskListStatusUsecase usecase.TeammateTaskListStatus
}

// NewTeammateTaskListStatusController generates controller.
func NewTeammateTaskListStatusController(pt usecase.TeammateTaskListStatus) TeammateTaskListStatus {
	return &teammateTaskListStatusController{
		teammateTaskListStatusUsecase: pt,
	}
}

func (c *teammateTaskListStatusController) Get(ctx context.Context, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatus, error) {
	return c.teammateTaskListStatusUsecase.Get(ctx, where)
}

func (c *teammateTaskListStatusController) List(ctx context.Context) ([]*model.TeammateTaskListStatus, error) {
	return c.teammateTaskListStatusUsecase.List(ctx)
}

func (c *teammateTaskListStatusController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatusConnection, error) {
	return c.teammateTaskListStatusUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *teammateTaskListStatusController) Create(ctx context.Context, input model.CreateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error) {
	return c.teammateTaskListStatusUsecase.Create(ctx, input)
}

func (c *teammateTaskListStatusController) Update(ctx context.Context, input model.UpdateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error) {
	return c.teammateTaskListStatusUsecase.Update(ctx, input)
}
