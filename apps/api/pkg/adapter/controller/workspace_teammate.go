package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// WorkspaceTeammate is an interface of controller.
type WorkspaceTeammate interface {
	Get(ctx context.Context, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammate, error)
	List(ctx context.Context) ([]*model.WorkspaceTeammate, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammateConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error)
	Update(ctx context.Context, input model.UpdateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error)
}

type workspaceTeammateController struct {
	workspaceTeammateUsecase usecase.WorkspaceTeammate
}

// NewWorkspaceTeammateController generates workspaceTeammate controller.
func NewWorkspaceTeammateController(wt usecase.WorkspaceTeammate) WorkspaceTeammate {
	return &workspaceTeammateController{
		workspaceTeammateUsecase: wt,
	}
}

func (c *workspaceTeammateController) Get(ctx context.Context, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammate, error) {
	return c.workspaceTeammateUsecase.Get(ctx, where)
}

func (c *workspaceTeammateController) List(ctx context.Context) ([]*model.WorkspaceTeammate, error) {
	return c.workspaceTeammateUsecase.List(ctx)
}

func (c *workspaceTeammateController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammateConnection, error) {
	return c.workspaceTeammateUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *workspaceTeammateController) Create(ctx context.Context, input model.CreateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error) {
	return c.workspaceTeammateUsecase.Create(ctx, input)
}

func (c *workspaceTeammateController) Update(ctx context.Context, input model.UpdateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error) {
	return c.workspaceTeammateUsecase.Update(ctx, input)
}
