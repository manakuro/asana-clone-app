package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ProjectTaskSection is an interface of controller.
type ProjectTaskSection interface {
	Get(ctx context.Context, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSection, error)
	List(ctx context.Context) ([]*model.ProjectTaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSectionConnection, error)
	ListByTaskID(ctx context.Context, taskID model.ID, where *model.ProjectTaskSectionWhereInput) ([]*model.ProjectTaskSection, error)
	Create(ctx context.Context, input model.CreateProjectTaskSectionInput) (*model.ProjectTaskSection, error)
	Update(ctx context.Context, input model.UpdateProjectTaskSectionInput) (*model.ProjectTaskSection, error)
	Delete(ctx context.Context, input model.DeleteProjectTaskSectionInput) (*model.ProjectTaskSection, error)
	DeleteAndKeepTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndKeepTasksInput) (*model.DeleteProjectTaskSectionAndKeepTasksPayload, error)
	DeleteAndDeleteTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndDeleteTasksInput) (*model.DeleteProjectTaskSectionAndDeleteTasksPayload, error)
	UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndKeepTasksInput) (*model.UndeleteProjectTaskSectionAndKeepTasksPayload, error)
	UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndDeleteTasksInput) (*model.UndeleteProjectTaskSectionAndDeleteTasksPayload, error)
}

type projectTaskSectionController struct {
	projectTaskSectionUsecase usecase.ProjectTaskSection
}

// NewProjectTaskSectionController generates controller.
func NewProjectTaskSectionController(pt usecase.ProjectTaskSection) ProjectTaskSection {
	return &projectTaskSectionController{
		projectTaskSectionUsecase: pt,
	}
}

func (c *projectTaskSectionController) Get(ctx context.Context, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSection, error) {
	return c.projectTaskSectionUsecase.Get(ctx, where)
}

func (c *projectTaskSectionController) List(ctx context.Context) ([]*model.ProjectTaskSection, error) {
	return c.projectTaskSectionUsecase.List(ctx)
}

func (c *projectTaskSectionController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSectionConnection, error) {
	return c.projectTaskSectionUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *projectTaskSectionController) ListByTaskID(ctx context.Context, taskID model.ID, where *model.ProjectTaskSectionWhereInput) ([]*model.ProjectTaskSection, error) {
	return c.projectTaskSectionUsecase.ListByTaskID(ctx, taskID, where)
}

func (c *projectTaskSectionController) Create(ctx context.Context, input model.CreateProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	return c.projectTaskSectionUsecase.Create(ctx, input)
}

func (c *projectTaskSectionController) Update(ctx context.Context, input model.UpdateProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	return c.projectTaskSectionUsecase.Update(ctx, input)
}

func (c *projectTaskSectionController) Delete(ctx context.Context, input model.DeleteProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	return c.projectTaskSectionUsecase.Delete(ctx, input)
}

func (c *projectTaskSectionController) DeleteAndKeepTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndKeepTasksInput) (*model.DeleteProjectTaskSectionAndKeepTasksPayload, error) {
	return c.projectTaskSectionUsecase.DeleteAndKeepTasks(ctx, input)
}

func (c *projectTaskSectionController) DeleteAndDeleteTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndDeleteTasksInput) (*model.DeleteProjectTaskSectionAndDeleteTasksPayload, error) {
	return c.projectTaskSectionUsecase.DeleteAndDeleteTasks(ctx, input)
}

func (c *projectTaskSectionController) UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndKeepTasksInput) (*model.UndeleteProjectTaskSectionAndKeepTasksPayload, error) {
	return c.projectTaskSectionUsecase.UndeleteAndKeepTasks(ctx, input)
}

func (c *projectTaskSectionController) UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndDeleteTasksInput) (*model.UndeleteProjectTaskSectionAndDeleteTasksPayload, error) {
	return c.projectTaskSectionUsecase.UndeleteAndDeleteTasks(ctx, input)
}
