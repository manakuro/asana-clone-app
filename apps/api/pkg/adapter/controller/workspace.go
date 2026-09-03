package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// Workspace is an interface of controller.
type Workspace interface {
	Get(ctx context.Context, where *model.WorkspaceWhereInput) (*model.Workspace, error)
	List(ctx context.Context) ([]*model.Workspace, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceWhereInput) (*model.WorkspaceConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceInput) (*model.Workspace, error)
	Update(ctx context.Context, input model.UpdateWorkspaceInput) (*model.Workspace, error)
}

type workspaceController struct {
	workspaceUsecase usecase.Workspace
}

// NewWorkspaceController generates workspace controller.
func NewWorkspaceController(tu usecase.Workspace) Workspace {
	return &workspaceController{
		workspaceUsecase: tu,
	}
}

func (c *workspaceController) Get(ctx context.Context, where *model.WorkspaceWhereInput) (*model.Workspace, error) {
	return c.workspaceUsecase.Get(ctx, where)
}

func (c *workspaceController) List(ctx context.Context) ([]*model.Workspace, error) {
	return c.workspaceUsecase.List(ctx)
}

func (c *workspaceController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceWhereInput) (*model.WorkspaceConnection, error) {
	return c.workspaceUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *workspaceController) Create(ctx context.Context, input model.CreateWorkspaceInput) (*model.Workspace, error) {
	return c.workspaceUsecase.Create(ctx, input)
}

func (c *workspaceController) Update(ctx context.Context, input model.UpdateWorkspaceInput) (*model.Workspace, error) {
	return c.workspaceUsecase.Update(ctx, input)
}
