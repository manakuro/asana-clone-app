package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectTaskUsecase struct {
	projectTaskRepository repository.ProjectTask
}

// ProjectTask is an interface of usecase.
type ProjectTask interface {
	Get(ctx context.Context, where *model.ProjectTaskWhereInput) (*model.ProjectTask, error)
	List(ctx context.Context) ([]*model.ProjectTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskWhereInput) (*model.ProjectTaskConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskInput) (*model.ProjectTask, error)
	CreateByTaskID(ctx context.Context, input model.CreateProjectTaskByTaskIDInput) (*model.ProjectTask, error)
	Update(ctx context.Context, input model.UpdateProjectTaskInput) (*model.ProjectTask, error)
	Delete(ctx context.Context, input model.DeleteProjectTaskInput) (*model.ProjectTask, error)
}

// NewProjectTaskUsecase generates a repository.
func NewProjectTaskUsecase(r repository.ProjectTask) ProjectTask {
	return &projectTaskUsecase{projectTaskRepository: r}
}

func (u *projectTaskUsecase) Get(ctx context.Context, where *model.ProjectTaskWhereInput) (*model.ProjectTask, error) {
	return u.projectTaskRepository.Get(ctx, where)
}

func (u *projectTaskUsecase) List(ctx context.Context) ([]*model.ProjectTask, error) {
	return u.projectTaskRepository.List(ctx)
}

func (u *projectTaskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskWhereInput) (*model.ProjectTaskConnection, error) {
	return u.projectTaskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectTaskUsecase) Create(ctx context.Context, input model.CreateProjectTaskInput) (*model.ProjectTask, error) {
	return u.projectTaskRepository.Create(ctx, input)
}

func (u *projectTaskUsecase) CreateByTaskID(ctx context.Context, input model.CreateProjectTaskByTaskIDInput) (*model.ProjectTask, error) {
	return u.projectTaskRepository.CreateByTaskID(ctx, input)
}

func (u *projectTaskUsecase) Update(ctx context.Context, input model.UpdateProjectTaskInput) (*model.ProjectTask, error) {
	return u.projectTaskRepository.Update(ctx, input)
}

func (u *projectTaskUsecase) Delete(ctx context.Context, input model.DeleteProjectTaskInput) (*model.ProjectTask, error) {
	return u.projectTaskRepository.Delete(ctx, input)
}
