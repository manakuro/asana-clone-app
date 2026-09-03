package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ArchivedWorkspaceActivityTask is an interface of controller.
type ArchivedWorkspaceActivityTask interface {
	Get(ctx context.Context, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTask, error)
	List(ctx context.Context) ([]*model.ArchivedWorkspaceActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error)
	Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error)
}

type archivedWorkspaceActivityTaskController struct {
	archivedWorkspaceActivityTaskUsecase usecase.ArchivedWorkspaceActivityTask
}

// NewArchivedWorkspaceActivityTaskController generates archivedWorkspaceActivityTask controller.
func NewArchivedWorkspaceActivityTaskController(pt usecase.ArchivedWorkspaceActivityTask) ArchivedWorkspaceActivityTask {
	return &archivedWorkspaceActivityTaskController{
		archivedWorkspaceActivityTaskUsecase: pt,
	}
}

func (c *archivedWorkspaceActivityTaskController) Get(ctx context.Context, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTask, error) {
	return c.archivedWorkspaceActivityTaskUsecase.Get(ctx, where)
}

func (c *archivedWorkspaceActivityTaskController) List(ctx context.Context) ([]*model.ArchivedWorkspaceActivityTask, error) {
	return c.archivedWorkspaceActivityTaskUsecase.List(ctx)
}

func (c *archivedWorkspaceActivityTaskController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTaskConnection, error) {
	return c.archivedWorkspaceActivityTaskUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *archivedWorkspaceActivityTaskController) Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error) {
	return c.archivedWorkspaceActivityTaskUsecase.Create(ctx, input)
}

func (c *archivedWorkspaceActivityTaskController) Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error) {
	return c.archivedWorkspaceActivityTaskUsecase.Update(ctx, input)
}
