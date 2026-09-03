package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type archivedTaskActivityUsecase struct {
	archivedTaskActivityRepository repository.ArchivedTaskActivity
}

// ArchivedTaskActivity is an interface of test user
type ArchivedTaskActivity interface {
	Get(ctx context.Context, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivity, error)
	List(ctx context.Context) ([]*model.ArchivedTaskActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivityConnection, error)
	Create(ctx context.Context, input model.CreateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error)
	Update(ctx context.Context, input model.UpdateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error)
}

// NewArchivedTaskActivityUsecase generates test user repository
func NewArchivedTaskActivityUsecase(r repository.ArchivedTaskActivity) ArchivedTaskActivity {
	return &archivedTaskActivityUsecase{archivedTaskActivityRepository: r}
}

func (u *archivedTaskActivityUsecase) Get(ctx context.Context, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivity, error) {
	return u.archivedTaskActivityRepository.Get(ctx, where)
}

func (u *archivedTaskActivityUsecase) List(ctx context.Context) ([]*model.ArchivedTaskActivity, error) {
	return u.archivedTaskActivityRepository.List(ctx)
}

func (u *archivedTaskActivityUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivityConnection, error) {
	return u.archivedTaskActivityRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *archivedTaskActivityUsecase) Create(ctx context.Context, input model.CreateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error) {
	return u.archivedTaskActivityRepository.Create(ctx, input)
}

func (u *archivedTaskActivityUsecase) Update(ctx context.Context, input model.UpdateArchivedTaskActivityInput) (*model.ArchivedTaskActivity, error) {
	return u.archivedTaskActivityRepository.Update(ctx, input)
}
