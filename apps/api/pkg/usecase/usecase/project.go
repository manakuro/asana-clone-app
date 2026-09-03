package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectUsecase struct {
	projectRepository repository.Project
}

// Project is an interface of test user
type Project interface {
	Get(ctx context.Context, where *model.ProjectWhereInput) (*model.Project, error)
	List(ctx context.Context) ([]*model.Project, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectWhereInput) (*model.ProjectConnection, error)
	Create(ctx context.Context, input model.CreateProjectInput) (*model.Project, error)
	Update(ctx context.Context, input model.UpdateProjectInput) (*model.Project, error)
}

// NewProjectUsecase generates test user repository
func NewProjectUsecase(r repository.Project) Project {
	return &projectUsecase{projectRepository: r}
}

func (u *projectUsecase) Get(ctx context.Context, where *model.ProjectWhereInput) (*model.Project, error) {
	return u.projectRepository.Get(ctx, where)
}

func (u *projectUsecase) List(ctx context.Context) ([]*model.Project, error) {
	return u.projectRepository.List(ctx)
}

func (u *projectUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectWhereInput) (*model.ProjectConnection, error) {
	return u.projectRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectUsecase) Create(ctx context.Context, input model.CreateProjectInput) (*model.Project, error) {
	return u.projectRepository.Create(ctx, input)
}

func (u *projectUsecase) Update(ctx context.Context, input model.UpdateProjectInput) (*model.Project, error) {
	return u.projectRepository.Update(ctx, input)
}
