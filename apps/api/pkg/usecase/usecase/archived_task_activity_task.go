package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type archivedTaskActivityTaskUsecase struct {
	archivedTaskActivityTaskRepository repository.ArchivedTaskActivityTask
}

// ArchivedTaskActivityTask is an interface of test user
type ArchivedTaskActivityTask interface {
	Get(ctx context.Context, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTask, error)
	List(ctx context.Context) ([]*model.ArchivedTaskActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error)
	Update(ctx context.Context, input model.UpdateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error)
}

// NewArchivedTaskActivityTaskUsecase generates test user repository
func NewArchivedTaskActivityTaskUsecase(r repository.ArchivedTaskActivityTask) ArchivedTaskActivityTask {
	return &archivedTaskActivityTaskUsecase{archivedTaskActivityTaskRepository: r}
}

func (u *archivedTaskActivityTaskUsecase) Get(ctx context.Context, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTask, error) {
	return u.archivedTaskActivityTaskRepository.Get(ctx, where)
}

func (u *archivedTaskActivityTaskUsecase) List(ctx context.Context) ([]*model.ArchivedTaskActivityTask, error) {
	return u.archivedTaskActivityTaskRepository.List(ctx)
}

func (u *archivedTaskActivityTaskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTaskConnection, error) {
	return u.archivedTaskActivityTaskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *archivedTaskActivityTaskUsecase) Create(ctx context.Context, input model.CreateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error) {
	return u.archivedTaskActivityTaskRepository.Create(ctx, input)
}

func (u *archivedTaskActivityTaskUsecase) Update(ctx context.Context, input model.UpdateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error) {
	return u.archivedTaskActivityTaskRepository.Update(ctx, input)
}
