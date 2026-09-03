package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectTaskSectionUsecase struct {
	projectTaskSectionRepository repository.ProjectTaskSection
}

// ProjectTaskSection is an interface of usecase.
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

// NewProjectTaskSectionUsecase generates a repository.
func NewProjectTaskSectionUsecase(r repository.ProjectTaskSection) ProjectTaskSection {
	return &projectTaskSectionUsecase{projectTaskSectionRepository: r}
}

func (u *projectTaskSectionUsecase) Get(ctx context.Context, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSection, error) {
	return u.projectTaskSectionRepository.Get(ctx, where)
}

func (u *projectTaskSectionUsecase) List(ctx context.Context) ([]*model.ProjectTaskSection, error) {
	return u.projectTaskSectionRepository.List(ctx)
}

func (u *projectTaskSectionUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSectionConnection, error) {
	return u.projectTaskSectionRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectTaskSectionUsecase) ListByTaskID(ctx context.Context, taskID model.ID, where *model.ProjectTaskSectionWhereInput) ([]*model.ProjectTaskSection, error) {
	return u.projectTaskSectionRepository.ListByTaskID(ctx, taskID, where)
}

func (u *projectTaskSectionUsecase) Create(ctx context.Context, input model.CreateProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	return u.projectTaskSectionRepository.Create(ctx, input)
}

func (u *projectTaskSectionUsecase) Update(ctx context.Context, input model.UpdateProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	return u.projectTaskSectionRepository.Update(ctx, input)
}

func (u *projectTaskSectionUsecase) Delete(ctx context.Context, input model.DeleteProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	return u.projectTaskSectionRepository.Delete(ctx, input)
}

func (u *projectTaskSectionUsecase) DeleteAndKeepTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndKeepTasksInput) (*model.DeleteProjectTaskSectionAndKeepTasksPayload, error) {
	return u.projectTaskSectionRepository.DeleteAndKeepTasks(ctx, input)
}

func (u *projectTaskSectionUsecase) DeleteAndDeleteTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndDeleteTasksInput) (*model.DeleteProjectTaskSectionAndDeleteTasksPayload, error) {
	return u.projectTaskSectionRepository.DeleteAndDeleteTasks(ctx, input)
}

func (u *projectTaskSectionUsecase) UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndKeepTasksInput) (*model.UndeleteProjectTaskSectionAndKeepTasksPayload, error) {
	return u.projectTaskSectionRepository.UndeleteAndKeepTasks(ctx, input)
}

func (u *projectTaskSectionUsecase) UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndDeleteTasksInput) (*model.UndeleteProjectTaskSectionAndDeleteTasksPayload, error) {
	return u.projectTaskSectionRepository.UndeleteAndDeleteTasks(ctx, input)
}
