package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectTaskColumnUsecase struct {
	projectTaskColumnRepository repository.ProjectTaskColumn
}

// ProjectTaskColumn is an interface of test user
type ProjectTaskColumn interface {
	Get(ctx context.Context, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumn, error)
	List(ctx context.Context) ([]*model.ProjectTaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskColumnInput) (*model.ProjectTaskColumn, error)
	Update(ctx context.Context, input model.UpdateProjectTaskColumnInput) (*model.ProjectTaskColumn, error)
}

// NewProjectTaskColumnUsecase generates test user repository
func NewProjectTaskColumnUsecase(r repository.ProjectTaskColumn) ProjectTaskColumn {
	return &projectTaskColumnUsecase{projectTaskColumnRepository: r}
}

func (u *projectTaskColumnUsecase) Get(ctx context.Context, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumn, error) {
	return u.projectTaskColumnRepository.Get(ctx, where)
}

func (u *projectTaskColumnUsecase) List(ctx context.Context) ([]*model.ProjectTaskColumn, error) {
	return u.projectTaskColumnRepository.List(ctx)
}

func (u *projectTaskColumnUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumnConnection, error) {
	return u.projectTaskColumnRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectTaskColumnUsecase) Create(ctx context.Context, input model.CreateProjectTaskColumnInput) (*model.ProjectTaskColumn, error) {
	return u.projectTaskColumnRepository.Create(ctx, input)
}

func (u *projectTaskColumnUsecase) Update(ctx context.Context, input model.UpdateProjectTaskColumnInput) (*model.ProjectTaskColumn, error) {
	return u.projectTaskColumnRepository.Update(ctx, input)
}
