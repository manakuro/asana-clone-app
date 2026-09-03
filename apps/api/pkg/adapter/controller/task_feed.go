package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TaskFeed is an interface of controller.
type TaskFeed interface {
	Get(ctx context.Context, where *model.TaskFeedWhereInput) (*model.TaskFeed, error)
	List(ctx context.Context, where *model.TaskFeedWhereInput) ([]*model.TaskFeed, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedWhereInput) (*model.TaskFeedConnection, error)
	Create(ctx context.Context, input model.CreateTaskFeedInput) (*model.TaskFeed, error)
	Update(ctx context.Context, input model.UpdateTaskFeedInput) (*model.TaskFeed, error)
	Delete(ctx context.Context, input model.DeleteTaskFeedInput) (*model.DeleteTaskFeedInputPayload, error)
	Undelete(ctx context.Context, input model.UndeleteTaskFeedInput) (*model.UndeleteTaskFeedInputPayload, error)
}

type taskFeedController struct {
	taskFeedUsecase usecase.TaskFeed
}

// NewTaskFeedController generates controller.
func NewTaskFeedController(u usecase.TaskFeed) TaskFeed {
	return &taskFeedController{
		taskFeedUsecase: u,
	}
}

func (c *taskFeedController) Get(ctx context.Context, where *model.TaskFeedWhereInput) (*model.TaskFeed, error) {
	return c.taskFeedUsecase.Get(ctx, where)
}

func (c *taskFeedController) List(ctx context.Context, where *model.TaskFeedWhereInput) ([]*model.TaskFeed, error) {
	return c.taskFeedUsecase.List(ctx, where)
}

func (c *taskFeedController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedWhereInput) (*model.TaskFeedConnection, error) {
	return c.taskFeedUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *taskFeedController) Create(ctx context.Context, input model.CreateTaskFeedInput) (*model.TaskFeed, error) {
	return c.taskFeedUsecase.Create(ctx, input)
}

func (c *taskFeedController) Update(ctx context.Context, input model.UpdateTaskFeedInput) (*model.TaskFeed, error) {
	return c.taskFeedUsecase.Update(ctx, input)
}

func (c *taskFeedController) Delete(ctx context.Context, input model.DeleteTaskFeedInput) (*model.DeleteTaskFeedInputPayload, error) {
	return c.taskFeedUsecase.Delete(ctx, input)
}

func (c *taskFeedController) Undelete(ctx context.Context, input model.UndeleteTaskFeedInput) (*model.UndeleteTaskFeedInputPayload, error) {
	return c.taskFeedUsecase.Undelete(ctx, input)
}
