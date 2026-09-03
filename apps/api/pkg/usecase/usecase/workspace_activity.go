package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type workspaceActivityUsecase struct {
	workspaceActivityRepository repository.WorkspaceActivity
}

// WorkspaceActivity is an interface of test user
type WorkspaceActivity interface {
	Get(ctx context.Context, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivity, error)
	List(ctx context.Context) ([]*model.WorkspaceActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivityConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceActivityInput) (*model.WorkspaceActivity, error)
	Update(ctx context.Context, input model.UpdateWorkspaceActivityInput) (*model.WorkspaceActivity, error)
}

// NewWorkspaceActivityUsecase generates test user repository
func NewWorkspaceActivityUsecase(r repository.WorkspaceActivity) WorkspaceActivity {
	return &workspaceActivityUsecase{workspaceActivityRepository: r}
}

func (u *workspaceActivityUsecase) Get(ctx context.Context, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivity, error) {
	return u.workspaceActivityRepository.Get(ctx, where)
}

func (u *workspaceActivityUsecase) List(ctx context.Context) ([]*model.WorkspaceActivity, error) {
	return u.workspaceActivityRepository.List(ctx)
}

func (u *workspaceActivityUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivityConnection, error) {
	return u.workspaceActivityRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *workspaceActivityUsecase) Create(ctx context.Context, input model.CreateWorkspaceActivityInput) (*model.WorkspaceActivity, error) {
	return u.workspaceActivityRepository.Create(ctx, input)
}

func (u *workspaceActivityUsecase) Update(ctx context.Context, input model.UpdateWorkspaceActivityInput) (*model.WorkspaceActivity, error) {
	return u.workspaceActivityRepository.Update(ctx, input)
}
