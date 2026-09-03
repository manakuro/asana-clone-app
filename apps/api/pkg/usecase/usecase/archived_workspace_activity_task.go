package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type archivedWorkspaceActivityTaskUsecase struct {
	archivedWorkspaceActivityTaskRepository repository.ArchivedWorkspaceActivityTask
}

// ArchivedWorkspaceActivityTask is an interface of test user
type ArchivedWorkspaceActivityTask interface {
	Get(ctx context.Context, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTask, error)
	List(ctx context.Context) ([]*model.ArchivedWorkspaceActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error)
	Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error)
}

// NewArchivedWorkspaceActivityTaskUsecase generates test user repository
func NewArchivedWorkspaceActivityTaskUsecase(r repository.ArchivedWorkspaceActivityTask) ArchivedWorkspaceActivityTask {
	return &archivedWorkspaceActivityTaskUsecase{archivedWorkspaceActivityTaskRepository: r}
}

func (u *archivedWorkspaceActivityTaskUsecase) Get(ctx context.Context, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTask, error) {
	return u.archivedWorkspaceActivityTaskRepository.Get(ctx, where)
}

func (u *archivedWorkspaceActivityTaskUsecase) List(ctx context.Context) ([]*model.ArchivedWorkspaceActivityTask, error) {
	return u.archivedWorkspaceActivityTaskRepository.List(ctx)
}

func (u *archivedWorkspaceActivityTaskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTaskConnection, error) {
	return u.archivedWorkspaceActivityTaskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *archivedWorkspaceActivityTaskUsecase) Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error) {
	return u.archivedWorkspaceActivityTaskRepository.Create(ctx, input)
}

func (u *archivedWorkspaceActivityTaskUsecase) Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error) {
	return u.archivedWorkspaceActivityTaskRepository.Update(ctx, input)
}
