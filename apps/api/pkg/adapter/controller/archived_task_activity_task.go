package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ArchivedTaskActivityTask is an interface of controller.
type ArchivedTaskActivityTask interface {
	Get(ctx context.Context, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTask, error)
	List(ctx context.Context) ([]*model.ArchivedTaskActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error)
	Update(ctx context.Context, input model.UpdateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error)
}

type archivedTaskActivityTaskController struct {
	archivedTaskActivityTaskUsecase usecase.ArchivedTaskActivityTask
}

// NewArchivedTaskActivityTaskController generates archivedTaskActivityTask controller.
func NewArchivedTaskActivityTaskController(pt usecase.ArchivedTaskActivityTask) ArchivedTaskActivityTask {
	return &archivedTaskActivityTaskController{
		archivedTaskActivityTaskUsecase: pt,
	}
}

func (c *archivedTaskActivityTaskController) Get(ctx context.Context, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTask, error) {
	return c.archivedTaskActivityTaskUsecase.Get(ctx, where)
}

func (c *archivedTaskActivityTaskController) List(ctx context.Context) ([]*model.ArchivedTaskActivityTask, error) {
	return c.archivedTaskActivityTaskUsecase.List(ctx)
}

func (c *archivedTaskActivityTaskController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTaskConnection, error) {
	return c.archivedTaskActivityTaskUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *archivedTaskActivityTaskController) Create(ctx context.Context, input model.CreateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error) {
	return c.archivedTaskActivityTaskUsecase.Create(ctx, input)
}

func (c *archivedTaskActivityTaskController) Update(ctx context.Context, input model.UpdateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error) {
	return c.archivedTaskActivityTaskUsecase.Update(ctx, input)
}
