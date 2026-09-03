package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type projectTeammateUsecase struct {
	projectTeammateRepository repository.ProjectTeammate
}

// ProjectTeammate is an interface of test user
type ProjectTeammate interface {
	Get(ctx context.Context, where *model.ProjectTeammateWhereInput) (*model.ProjectTeammate, error)
	List(ctx context.Context) ([]*model.ProjectTeammate, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTeammateWhereInput) (*model.ProjectTeammateConnection, error)
	Create(ctx context.Context, input model.CreateProjectTeammateInput) (*model.ProjectTeammate, error)
	Update(ctx context.Context, input model.UpdateProjectTeammateInput) (*model.ProjectTeammate, error)
	UpdateOwner(ctx context.Context, input model.UpdateProjectTeammateOwnerInput) (*model.ProjectTeammate, error)
}

// NewProjectTeammateUsecase generates test user repository
func NewProjectTeammateUsecase(r repository.ProjectTeammate) ProjectTeammate {
	return &projectTeammateUsecase{projectTeammateRepository: r}
}

func (u *projectTeammateUsecase) Get(ctx context.Context, where *model.ProjectTeammateWhereInput) (*model.ProjectTeammate, error) {
	return u.projectTeammateRepository.Get(ctx, where)
}

func (u *projectTeammateUsecase) List(ctx context.Context) ([]*model.ProjectTeammate, error) {
	return u.projectTeammateRepository.List(ctx)
}

func (u *projectTeammateUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTeammateWhereInput) (*model.ProjectTeammateConnection, error) {
	return u.projectTeammateRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *projectTeammateUsecase) Create(ctx context.Context, input model.CreateProjectTeammateInput) (*model.ProjectTeammate, error) {
	return u.projectTeammateRepository.Create(ctx, input)
}

func (u *projectTeammateUsecase) Update(ctx context.Context, input model.UpdateProjectTeammateInput) (*model.ProjectTeammate, error) {
	return u.projectTeammateRepository.Update(ctx, input)
}

func (u *projectTeammateUsecase) UpdateOwner(ctx context.Context, input model.UpdateProjectTeammateOwnerInput) (*model.ProjectTeammate, error) {
	return u.projectTeammateRepository.UpdateOwner(ctx, input)
}
