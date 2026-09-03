package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type teammateUsecase struct {
	teammateRepository repository.Teammate
}

// Teammate is an interface of test user
type Teammate interface {
	Get(ctx context.Context, id model.ID) (*model.Teammate, error)
	List(ctx context.Context) ([]*model.Teammate, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateWhereInput) (*model.TeammateConnection, error)
	Create(ctx context.Context, input model.CreateTeammateInput) (*model.Teammate, error)
	Update(ctx context.Context, input model.UpdateTeammateInput) (*model.Teammate, error)
}

// NewTeammateUsecase generates test user repository
func NewTeammateUsecase(r repository.Teammate) Teammate {
	return &teammateUsecase{teammateRepository: r}
}

func (u *teammateUsecase) Get(ctx context.Context, id model.ID) (*model.Teammate, error) {
	return u.teammateRepository.Get(ctx, id)
}

func (u *teammateUsecase) List(ctx context.Context) ([]*model.Teammate, error) {
	return u.teammateRepository.List(ctx)
}

func (u *teammateUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateWhereInput) (*model.TeammateConnection, error) {
	return u.teammateRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *teammateUsecase) Create(ctx context.Context, input model.CreateTeammateInput) (*model.Teammate, error) {
	return u.teammateRepository.Create(ctx, input)
}

func (u *teammateUsecase) Update(ctx context.Context, input model.UpdateTeammateInput) (*model.Teammate, error) {
	return u.teammateRepository.Update(ctx, input)
}
