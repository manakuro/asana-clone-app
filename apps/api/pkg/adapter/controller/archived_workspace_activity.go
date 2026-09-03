package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ArchivedWorkspaceActivity is an interface of controller.
type ArchivedWorkspaceActivity interface {
	Get(ctx context.Context, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivity, error)
	List(ctx context.Context) ([]*model.ArchivedWorkspaceActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivityConnection, error)
	Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error)
	Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error)
}

type archivedArchivedWorkspaceActivityController struct {
	archivedArchivedWorkspaceActivityUsecase usecase.ArchivedWorkspaceActivity
}

// NewArchivedWorkspaceActivityController generates archivedArchivedWorkspaceActivity controller.
func NewArchivedWorkspaceActivityController(w usecase.ArchivedWorkspaceActivity) ArchivedWorkspaceActivity {
	return &archivedArchivedWorkspaceActivityController{
		archivedArchivedWorkspaceActivityUsecase: w,
	}
}

func (c *archivedArchivedWorkspaceActivityController) Get(ctx context.Context, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivity, error) {
	return c.archivedArchivedWorkspaceActivityUsecase.Get(ctx, where)
}

func (c *archivedArchivedWorkspaceActivityController) List(ctx context.Context) ([]*model.ArchivedWorkspaceActivity, error) {
	return c.archivedArchivedWorkspaceActivityUsecase.List(ctx)
}

func (c *archivedArchivedWorkspaceActivityController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivityConnection, error) {
	return c.archivedArchivedWorkspaceActivityUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *archivedArchivedWorkspaceActivityController) Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error) {
	return c.archivedArchivedWorkspaceActivityUsecase.Create(ctx, input)
}

func (c *archivedArchivedWorkspaceActivityController) Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error) {
	return c.archivedArchivedWorkspaceActivityUsecase.Update(ctx, input)
}
