package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type workspaceTeammateUsecase struct {
	workspaceTeammateRepository repository.WorkspaceTeammate
}

// WorkspaceTeammate is an interface of test user
type WorkspaceTeammate interface {
	Get(ctx context.Context, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammate, error)
	List(ctx context.Context) ([]*model.WorkspaceTeammate, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammateConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error)
	Update(ctx context.Context, input model.UpdateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error)
}

// NewWorkspaceTeammateUsecase generates test user repository
func NewWorkspaceTeammateUsecase(r repository.WorkspaceTeammate) WorkspaceTeammate {
	return &workspaceTeammateUsecase{workspaceTeammateRepository: r}
}

func (u *workspaceTeammateUsecase) Get(ctx context.Context, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammate, error) {
	return u.workspaceTeammateRepository.Get(ctx, where)
}

func (u *workspaceTeammateUsecase) List(ctx context.Context) ([]*model.WorkspaceTeammate, error) {
	return u.workspaceTeammateRepository.List(ctx)
}

func (u *workspaceTeammateUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammateConnection, error) {
	return u.workspaceTeammateRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *workspaceTeammateUsecase) Create(ctx context.Context, input model.CreateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error) {
	return u.workspaceTeammateRepository.Create(ctx, input)
}

func (u *workspaceTeammateUsecase) Update(ctx context.Context, input model.UpdateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error) {
	return u.workspaceTeammateRepository.Update(ctx, input)
}
