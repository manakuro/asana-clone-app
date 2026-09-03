package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectIconUsecase struct {
	projectIconRepository repository.ProjectIcon
}

// ProjectIcon is an interface of test user
type ProjectIcon interface {
	Get(ctx context.Context, where *model.ProjectIconWhereInput) (*model.ProjectIcon, error)
	List(ctx context.Context) ([]*model.ProjectIcon, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectIconWhereInput) (*model.ProjectIconConnection, error)
	Create(ctx context.Context, input model.CreateProjectIconInput) (*model.ProjectIcon, error)
	Update(ctx context.Context, input model.UpdateProjectIconInput) (*model.ProjectIcon, error)
}

// NewProjectIconUsecase generates test user repository
func NewProjectIconUsecase(r repository.ProjectIcon) ProjectIcon {
	return &projectIconUsecase{projectIconRepository: r}
}

func (u *projectIconUsecase) Get(ctx context.Context, where *model.ProjectIconWhereInput) (*model.ProjectIcon, error) {
	return u.projectIconRepository.Get(ctx, where)
}

func (u *projectIconUsecase) List(ctx context.Context) ([]*model.ProjectIcon, error) {
	return u.projectIconRepository.List(ctx)
}

func (u *projectIconUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectIconWhereInput) (*model.ProjectIconConnection, error) {
	return u.projectIconRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectIconUsecase) Create(ctx context.Context, input model.CreateProjectIconInput) (*model.ProjectIcon, error) {
	return u.projectIconRepository.Create(ctx, input)
}

func (u *projectIconUsecase) Update(ctx context.Context, input model.UpdateProjectIconInput) (*model.ProjectIcon, error) {
	return u.projectIconRepository.Update(ctx, input)
}
