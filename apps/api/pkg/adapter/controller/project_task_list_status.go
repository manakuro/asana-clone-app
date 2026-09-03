package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ProjectTaskListStatus is an interface of controller.
type ProjectTaskListStatus interface {
	Get(ctx context.Context, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatus, error)
	List(ctx context.Context) ([]*model.ProjectTaskListStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatusConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error)
	Update(ctx context.Context, input model.UpdateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error)
}

type projectTaskListStatusController struct {
	projectTaskListStatusUsecase usecase.ProjectTaskListStatus
}

// NewProjectTaskListStatusController generates controller.
func NewProjectTaskListStatusController(pt usecase.ProjectTaskListStatus) ProjectTaskListStatus {
	return &projectTaskListStatusController{
		projectTaskListStatusUsecase: pt,
	}
}

func (c *projectTaskListStatusController) Get(ctx context.Context, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatus, error) {
	return c.projectTaskListStatusUsecase.Get(ctx, where)
}

func (c *projectTaskListStatusController) List(ctx context.Context) ([]*model.ProjectTaskListStatus, error) {
	return c.projectTaskListStatusUsecase.List(ctx)
}

func (c *projectTaskListStatusController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatusConnection, error) {
	return c.projectTaskListStatusUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectTaskListStatusController) Create(ctx context.Context, input model.CreateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error) {
	return c.projectTaskListStatusUsecase.Create(ctx, input)
}

func (c *projectTaskListStatusController) Update(ctx context.Context, input model.UpdateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error) {
	return c.projectTaskListStatusUsecase.Update(ctx, input)
}
