package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type archivedWorkspaceActivityUsecase struct {
	archivedWorkspaceActivityRepository repository.ArchivedWorkspaceActivity
}

// ArchivedWorkspaceActivity is an interface of test user
type ArchivedWorkspaceActivity interface {
	Get(ctx context.Context, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivity, error)
	List(ctx context.Context) ([]*model.ArchivedWorkspaceActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivityConnection, error)
	Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error)
	Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error)
}

// NewArchivedWorkspaceActivityUsecase generates test user repository
func NewArchivedWorkspaceActivityUsecase(r repository.ArchivedWorkspaceActivity) ArchivedWorkspaceActivity {
	return &archivedWorkspaceActivityUsecase{archivedWorkspaceActivityRepository: r}
}

func (u *archivedWorkspaceActivityUsecase) Get(ctx context.Context, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivity, error) {
	return u.archivedWorkspaceActivityRepository.Get(ctx, where)
}

func (u *archivedWorkspaceActivityUsecase) List(ctx context.Context) ([]*model.ArchivedWorkspaceActivity, error) {
	return u.archivedWorkspaceActivityRepository.List(ctx)
}

func (u *archivedWorkspaceActivityUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivityConnection, error) {
	return u.archivedWorkspaceActivityRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *archivedWorkspaceActivityUsecase) Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error) {
	return u.archivedWorkspaceActivityRepository.Create(ctx, input)
}

func (u *archivedWorkspaceActivityUsecase) Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error) {
	return u.archivedWorkspaceActivityRepository.Update(ctx, input)
}
