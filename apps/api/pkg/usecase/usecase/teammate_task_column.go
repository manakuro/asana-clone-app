package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type teammateTaskColumnUsecase struct {
	teammateTaskColumnRepository repository.TeammateTaskColumn
}

// TeammateTaskColumn is an interface of test user
type TeammateTaskColumn interface {
	Get(ctx context.Context, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumn, error)
	List(ctx context.Context) ([]*model.TeammateTaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error)
	UpdateOrder(ctx context.Context, input model.UpdateTeammateTaskColumnOrderInput) ([]*model.TeammateTaskColumn, error)
}

// NewTeammateTaskColumnUsecase generates test user repository
func NewTeammateTaskColumnUsecase(r repository.TeammateTaskColumn) TeammateTaskColumn {
	return &teammateTaskColumnUsecase{teammateTaskColumnRepository: r}
}

func (u *teammateTaskColumnUsecase) Get(ctx context.Context, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumn, error) {
	return u.teammateTaskColumnRepository.Get(ctx, where)
}

func (u *teammateTaskColumnUsecase) List(ctx context.Context) ([]*model.TeammateTaskColumn, error) {
	return u.teammateTaskColumnRepository.List(ctx)
}

func (u *teammateTaskColumnUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumnConnection, error) {
	return u.teammateTaskColumnRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *teammateTaskColumnUsecase) Create(ctx context.Context, input model.CreateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error) {
	return u.teammateTaskColumnRepository.Create(ctx, input)
}

func (u *teammateTaskColumnUsecase) Update(ctx context.Context, input model.UpdateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error) {
	return u.teammateTaskColumnRepository.Update(ctx, input)
}

func (u *teammateTaskColumnUsecase) UpdateOrder(ctx context.Context, input model.UpdateTeammateTaskColumnOrderInput) ([]*model.TeammateTaskColumn, error) {
	return u.teammateTaskColumnRepository.UpdateOrder(ctx, input)
}
