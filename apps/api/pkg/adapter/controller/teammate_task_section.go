package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TeammateTaskSection is an interface of controller.
type TeammateTaskSection interface {
	Get(ctx context.Context, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSection, error)
	List(ctx context.Context) ([]*model.TeammateTaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSectionConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	Delete(ctx context.Context, input model.DeleteTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	DeleteAndKeepTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndKeepTasksInput) (*model.DeleteTeammateTaskSectionAndKeepTasksPayload, error)
	DeleteAndDeleteTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndDeleteTasksInput) (*model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error)
	UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndKeepTasksInput) (*model.UndeleteTeammateTaskSectionAndKeepTasksPayload, error)
	UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndDeleteTasksInput) (*model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error)
}

type teammateTaskSectionController struct {
	teammateTaskSectionUsecase usecase.TeammateTaskSection
}

// NewTeammateTaskSectionController generates controller.
func NewTeammateTaskSectionController(pt usecase.TeammateTaskSection) TeammateTaskSection {
	return &teammateTaskSectionController{
		teammateTaskSectionUsecase: pt,
	}
}

func (c *teammateTaskSectionController) Get(ctx context.Context, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSection, error) {
	return c.teammateTaskSectionUsecase.Get(ctx, where)
}

func (c *teammateTaskSectionController) List(ctx context.Context) ([]*model.TeammateTaskSection, error) {
	return c.teammateTaskSectionUsecase.List(ctx)
}

func (c *teammateTaskSectionController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSectionConnection, error) {
	return c.teammateTaskSectionUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *teammateTaskSectionController) Create(ctx context.Context, input model.CreateTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	return c.teammateTaskSectionUsecase.Create(ctx, input)
}

func (c *teammateTaskSectionController) Update(ctx context.Context, input model.UpdateTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	return c.teammateTaskSectionUsecase.Update(ctx, input)
}

func (c *teammateTaskSectionController) Delete(ctx context.Context, input model.DeleteTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	return c.teammateTaskSectionUsecase.Delete(ctx, input)
}

func (c *teammateTaskSectionController) DeleteAndKeepTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndKeepTasksInput) (*model.DeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	return c.teammateTaskSectionUsecase.DeleteAndKeepTasks(ctx, input)
}

func (c *teammateTaskSectionController) DeleteAndDeleteTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndDeleteTasksInput) (*model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	return c.teammateTaskSectionUsecase.DeleteAndDeleteTasks(ctx, input)
}

func (c *teammateTaskSectionController) UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndKeepTasksInput) (*model.UndeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	return c.teammateTaskSectionUsecase.UndeleteAndKeepTasks(ctx, input)
}

func (c *teammateTaskSectionController) UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndDeleteTasksInput) (*model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	return c.teammateTaskSectionUsecase.UndeleteAndDeleteTasks(ctx, input)
}
