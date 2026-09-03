package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ArchivedTaskActivity is an interface of controller.
type ArchivedTaskActivity interface {
	Get(ctx context.Context, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivity, error)
	List(ctx context.Context) ([]*model.ArchivedTaskActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivityConnection, error)
	Create(ctx context.Context, input model.CreateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error)
	Update(ctx context.Context, input model.UpdateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error)
}

type archivedTaskActivityController struct {
	archivedTaskActivityUsecase usecase.ArchivedTaskActivity
}

// NewArchivedTaskActivityController generates archivedTaskActivity controller.
func NewArchivedTaskActivityController(pt usecase.ArchivedTaskActivity) ArchivedTaskActivity {
	return &archivedTaskActivityController{
		archivedTaskActivityUsecase: pt,
	}
}

func (c *archivedTaskActivityController) Get(ctx context.Context, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivity, error) {
	return c.archivedTaskActivityUsecase.Get(ctx, where)
}

func (c *archivedTaskActivityController) List(ctx context.Context) ([]*model.ArchivedTaskActivity, error) {
	return c.archivedTaskActivityUsecase.List(ctx)
}

func (c *archivedTaskActivityController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivityConnection, error) {
	return c.archivedTaskActivityUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *archivedTaskActivityController) Create(ctx context.Context, input model.CreateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error) {
	return c.archivedTaskActivityUsecase.Create(ctx, input)
}

func (c *archivedTaskActivityController) Update(ctx context.Context, input model.UpdateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error) {
	return c.archivedTaskActivityUsecase.Update(ctx, input)
}
