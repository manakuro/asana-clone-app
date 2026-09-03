package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type colorUsecase struct {
	colorRepository repository.Color
}

// Color is an interface of test user
type Color interface {
	Get(ctx context.Context, id model.ID) (*model.Color, error)
	List(ctx context.Context) ([]*model.Color, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ColorWhereInput) (*model.ColorConnection, error)
	Create(ctx context.Context, input model.CreateColorInput) (*model.Color, error)
	Update(ctx context.Context, input model.UpdateColorInput) (*model.Color, error)
}

// NewColorUsecase generates test user repository
func NewColorUsecase(r repository.Color) Color {
	return &colorUsecase{colorRepository: r}
}

func (u *colorUsecase) Get(ctx context.Context, id model.ID) (*model.Color, error) {
	return u.colorRepository.Get(ctx, id)
}

func (u *colorUsecase) List(ctx context.Context) ([]*model.Color, error) {
	return u.colorRepository.List(ctx)
}

func (u *colorUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ColorWhereInput) (*model.ColorConnection, error) {
	return u.colorRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *colorUsecase) Create(ctx context.Context, input model.CreateColorInput) (*model.Color, error) {
	return u.colorRepository.Create(ctx, input)
}

func (u *colorUsecase) Update(ctx context.Context, input model.UpdateColorInput) (*model.Color, error) {
	return u.colorRepository.Update(ctx, input)
}
