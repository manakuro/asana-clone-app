package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type iconUsecase struct {
	iconRepository repository.Icon
}

// Icon is an interface of test user
type Icon interface {
	Get(ctx context.Context, id model.ID) (*model.Icon, error)
	List(ctx context.Context) ([]*model.Icon, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.IconWhereInput) (*model.IconConnection, error)
	Create(ctx context.Context, input model.CreateIconInput) (*model.Icon, error)
	Update(ctx context.Context, input model.UpdateIconInput) (*model.Icon, error)
}

// NewIconUsecase generates test user repository
func NewIconUsecase(r repository.Icon) Icon {
	return &iconUsecase{iconRepository: r}
}

func (u *iconUsecase) Get(ctx context.Context, id model.ID) (*model.Icon, error) {
	return u.iconRepository.Get(ctx, id)
}

func (u *iconUsecase) List(ctx context.Context) ([]*model.Icon, error) {
	return u.iconRepository.List(ctx)
}

func (u *iconUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.IconWhereInput) (*model.IconConnection, error) {
	return u.iconRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *iconUsecase) Create(ctx context.Context, input model.CreateIconInput) (*model.Icon, error) {
	return u.iconRepository.Create(ctx, input)
}

func (u *iconUsecase) Update(ctx context.Context, input model.UpdateIconInput) (*model.Icon, error) {
	return u.iconRepository.Update(ctx, input)
}
