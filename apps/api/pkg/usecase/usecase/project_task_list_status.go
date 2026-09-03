package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectTaskListStatusUsecase struct {
	projectTaskListStatusRepository repository.ProjectTaskListStatus
}

// ProjectTaskListStatus is an interface of usecase.
type ProjectTaskListStatus interface {
	Get(ctx context.Context, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatus, error)
	List(ctx context.Context) ([]*model.ProjectTaskListStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatusConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error)
	Update(ctx context.Context, input model.UpdateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error)
}

// NewProjectTaskListStatusUsecase generates a repository.
func NewProjectTaskListStatusUsecase(r repository.ProjectTaskListStatus) ProjectTaskListStatus {
	return &projectTaskListStatusUsecase{projectTaskListStatusRepository: r}
}

func (u *projectTaskListStatusUsecase) Get(ctx context.Context, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatus, error) {
	return u.projectTaskListStatusRepository.Get(ctx, where)
}

func (u *projectTaskListStatusUsecase) List(ctx context.Context) ([]*model.ProjectTaskListStatus, error) {
	return u.projectTaskListStatusRepository.List(ctx)
}

func (u *projectTaskListStatusUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatusConnection, error) {
	return u.projectTaskListStatusRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectTaskListStatusUsecase) Create(ctx context.Context, input model.CreateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error) {
	return u.projectTaskListStatusRepository.Create(ctx, input)
}

func (u *projectTaskListStatusUsecase) Update(ctx context.Context, input model.UpdateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error) {
	return u.projectTaskListStatusRepository.Update(ctx, input)
}
