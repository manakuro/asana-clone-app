package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TeammateTask is an interface of controller.
type TeammateTask interface {
	Get(ctx context.Context, where *model.TeammateTaskWhereInput) (*model.TeammateTask, error)
	List(ctx context.Context) ([]*model.TeammateTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskWhereInput) (*model.TeammateTaskConnection, error)
	TasksDueSoon(ctx context.Context, workspaceID model.ID, teammateID model.ID) ([]*model.TeammateTask, error)
	Create(ctx context.Context, input model.CreateTeammateTaskInput) (*model.TeammateTask, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskInput) (*model.TeammateTask, error)
	Delete(ctx context.Context, input model.DeleteTeammateTaskInput) (*model.TeammateTask, error)
}

type teammateTaskController struct {
	teammateTaskUsecase usecase.TeammateTask
}

// NewTeammateTaskController generates controller.
func NewTeammateTaskController(u usecase.TeammateTask) TeammateTask {
	return &teammateTaskController{
		teammateTaskUsecase: u,
	}
}

func (c *teammateTaskController) Get(ctx context.Context, where *model.TeammateTaskWhereInput) (*model.TeammateTask, error) {
	return c.teammateTaskUsecase.Get(ctx, where)
}

func (c *teammateTaskController) List(ctx context.Context) ([]*model.TeammateTask, error) {
	return c.teammateTaskUsecase.List(ctx)
}

func (c *teammateTaskController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskWhereInput) (*model.TeammateTaskConnection, error) {
	return c.teammateTaskUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *teammateTaskController) TasksDueSoon(ctx context.Context, workspaceID model.ID, teammateID model.ID) ([]*model.TeammateTask, error) {
	return c.teammateTaskUsecase.TasksDueSoon(ctx, workspaceID, teammateID)
}

func (c *teammateTaskController) Create(ctx context.Context, input model.CreateTeammateTaskInput) (*model.TeammateTask, error) {
	return c.teammateTaskUsecase.Create(ctx, input)
}

func (c *teammateTaskController) Update(ctx context.Context, input model.UpdateTeammateTaskInput) (*model.TeammateTask, error) {
	return c.teammateTaskUsecase.Update(ctx, input)
}

func (c *teammateTaskController) Delete(ctx context.Context, input model.DeleteTeammateTaskInput) (*model.TeammateTask, error) {
	return c.teammateTaskUsecase.Delete(ctx, input)
}
