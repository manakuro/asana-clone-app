package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// WorkspaceActivity is an interface of controller.
type WorkspaceActivity interface {
	Get(ctx context.Context, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivity, error)
	List(ctx context.Context) ([]*model.WorkspaceActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivityConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceActivityInput) (*model.WorkspaceActivity, error)
	Update(ctx context.Context, input model.UpdateWorkspaceActivityInput) (*model.WorkspaceActivity, error)
}

type workspaceActivityController struct {
	workspaceActivityUsecase usecase.WorkspaceActivity
}

// NewWorkspaceActivityController generates workspaceActivity controller.
func NewWorkspaceActivityController(w usecase.WorkspaceActivity) WorkspaceActivity {
	return &workspaceActivityController{
		workspaceActivityUsecase: w,
	}
}

func (c *workspaceActivityController) Get(ctx context.Context, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivity, error) {
	return c.workspaceActivityUsecase.Get(ctx, where)
}

func (c *workspaceActivityController) List(ctx context.Context) ([]*model.WorkspaceActivity, error) {
	return c.workspaceActivityUsecase.List(ctx)
}

func (c *workspaceActivityController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivityConnection, error) {
	return c.workspaceActivityUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *workspaceActivityController) Create(ctx context.Context, input model.CreateWorkspaceActivityInput) (*model.WorkspaceActivity, error) {
	return c.workspaceActivityUsecase.Create(ctx, input)
}

func (c *workspaceActivityController) Update(ctx context.Context, input model.UpdateWorkspaceActivityInput) (*model.WorkspaceActivity, error) {
	return c.workspaceActivityUsecase.Update(ctx, input)
}
