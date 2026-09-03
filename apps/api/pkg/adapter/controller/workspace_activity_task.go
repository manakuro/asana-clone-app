package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// WorkspaceActivityTask is an interface of controller.
type WorkspaceActivityTask interface {
	Get(ctx context.Context, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTask, error)
	List(ctx context.Context) ([]*model.WorkspaceActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error)
	Update(ctx context.Context, input model.UpdateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error)
}

type workspaceActivityTaskController struct {
	workspaceActivityTaskUsecase usecase.WorkspaceActivityTask
}

// NewWorkspaceActivityTaskController generates workspaceActivityTask controller.
func NewWorkspaceActivityTaskController(pt usecase.WorkspaceActivityTask) WorkspaceActivityTask {
	return &workspaceActivityTaskController{
		workspaceActivityTaskUsecase: pt,
	}
}

func (c *workspaceActivityTaskController) Get(ctx context.Context, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTask, error) {
	return c.workspaceActivityTaskUsecase.Get(ctx, where)
}

func (c *workspaceActivityTaskController) List(ctx context.Context) ([]*model.WorkspaceActivityTask, error) {
	return c.workspaceActivityTaskUsecase.List(ctx)
}

func (c *workspaceActivityTaskController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTaskConnection, error) {
	return c.workspaceActivityTaskUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *workspaceActivityTaskController) Create(ctx context.Context, input model.CreateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error) {
	return c.workspaceActivityTaskUsecase.Create(ctx, input)
}

func (c *workspaceActivityTaskController) Update(ctx context.Context, input model.UpdateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error) {
	return c.workspaceActivityTaskUsecase.Update(ctx, input)
}
