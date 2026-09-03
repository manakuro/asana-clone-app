package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type teammateTaskListStatusUsecase struct {
	teammateTaskListStatusRepository repository.TeammateTaskListStatus
}

// TeammateTaskListStatus is an interface of usecase.
type TeammateTaskListStatus interface {
	Get(ctx context.Context, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatus, error)
	List(ctx context.Context) ([]*model.TeammateTaskListStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatusConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error)
}

// NewTeammateTaskListStatusUsecase generates a repository.
func NewTeammateTaskListStatusUsecase(r repository.TeammateTaskListStatus) TeammateTaskListStatus {
	return &teammateTaskListStatusUsecase{teammateTaskListStatusRepository: r}
}

func (u *teammateTaskListStatusUsecase) Get(ctx context.Context, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatus, error) {
	return u.teammateTaskListStatusRepository.Get(ctx, where)
}

func (u *teammateTaskListStatusUsecase) List(ctx context.Context) ([]*model.TeammateTaskListStatus, error) {
	return u.teammateTaskListStatusRepository.List(ctx)
}

func (u *teammateTaskListStatusUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatusConnection, error) {
	return u.teammateTaskListStatusRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *teammateTaskListStatusUsecase) Create(ctx context.Context, input model.CreateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error) {
	return u.teammateTaskListStatusRepository.Create(ctx, input)
}

func (u *teammateTaskListStatusUsecase) Update(ctx context.Context, input model.UpdateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error) {
	return u.teammateTaskListStatusRepository.Update(ctx, input)
}
