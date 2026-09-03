package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// DeletedTask is an interface of controller.
type DeletedTask interface {
	Get(ctx context.Context, where *model.DeletedTaskWhereInput) (*model.DeletedTask, error)
	List(ctx context.Context) ([]*model.DeletedTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.DeletedTaskWhereInput) (*model.DeletedTaskConnection, error)
	Create(ctx context.Context, input model.CreateDeletedTaskInput) (*model.DeletedTask, error)
	Update(ctx context.Context, input model.UpdateDeletedTaskInput) (*model.DeletedTask, error)
	Delete(ctx context.Context, input model.DeleteDeletedTaskInput) (*model.DeletedTask, error)
	Undelete(ctx context.Context, input model.UndeleteDeletedTaskInput) ([]*model.DeletedTask, error)
}

type deletedTaskController struct {
	deletedTaskUsecase usecase.DeletedTask
}

// NewDeletedTaskController generates controller.
func NewDeletedTaskController(u usecase.DeletedTask) DeletedTask {
	return &deletedTaskController{
		deletedTaskUsecase: u,
	}
}

func (c *deletedTaskController) Get(ctx context.Context, where *model.DeletedTaskWhereInput) (*model.DeletedTask, error) {
	return c.deletedTaskUsecase.Get(ctx, where)
}

func (c *deletedTaskController) List(ctx context.Context) ([]*model.DeletedTask, error) {
	return c.deletedTaskUsecase.List(ctx)
}

func (c *deletedTaskController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.DeletedTaskWhereInput) (*model.DeletedTaskConnection, error) {
	return c.deletedTaskUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *deletedTaskController) Create(ctx context.Context, input model.CreateDeletedTaskInput) (*model.DeletedTask, error) {
	return c.deletedTaskUsecase.Create(ctx, input)
}

func (c *deletedTaskController) Update(ctx context.Context, input model.UpdateDeletedTaskInput) (*model.DeletedTask, error) {
	return c.deletedTaskUsecase.Update(ctx, input)
}

func (c *deletedTaskController) Delete(ctx context.Context, input model.DeleteDeletedTaskInput) (*model.DeletedTask, error) {
	return c.deletedTaskUsecase.Delete(ctx, input)
}

func (c *deletedTaskController) Undelete(ctx context.Context, input model.UndeleteDeletedTaskInput) ([]*model.DeletedTask, error) {
	return c.deletedTaskUsecase.Undelete(ctx, input)
}
