package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectBaseColorUsecase struct {
	projectBaseColorRepository repository.ProjectBaseColor
}

// ProjectBaseColor is an interface of test user
type ProjectBaseColor interface {
	Get(ctx context.Context, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColor, error)
	List(ctx context.Context) ([]*model.ProjectBaseColor, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColorConnection, error)
	Create(ctx context.Context, input model.CreateProjectBaseColorInput) (*model.ProjectBaseColor, error)
	Update(ctx context.Context, input model.UpdateProjectBaseColorInput) (*model.ProjectBaseColor, error)
}

// NewProjectBaseColorUsecase generates test user repository
func NewProjectBaseColorUsecase(r repository.ProjectBaseColor) ProjectBaseColor {
	return &projectBaseColorUsecase{projectBaseColorRepository: r}
}

func (u *projectBaseColorUsecase) Get(ctx context.Context, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColor, error) {
	return u.projectBaseColorRepository.Get(ctx, where)
}

func (u *projectBaseColorUsecase) List(ctx context.Context) ([]*model.ProjectBaseColor, error) {
	return u.projectBaseColorRepository.List(ctx)
}

func (u *projectBaseColorUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColorConnection, error) {
	return u.projectBaseColorRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectBaseColorUsecase) Create(ctx context.Context, input model.CreateProjectBaseColorInput) (*model.ProjectBaseColor, error) {
	return u.projectBaseColorRepository.Create(ctx, input)
}

func (u *projectBaseColorUsecase) Update(ctx context.Context, input model.UpdateProjectBaseColorInput) (*model.ProjectBaseColor, error) {
	return u.projectBaseColorRepository.Update(ctx, input)
}
