package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type tagUsecase struct {
	tagRepository repository.Tag
}

// Tag is an interface of test user
type Tag interface {
	Get(ctx context.Context, where *model.TagWhereInput) (*model.Tag, error)
	List(ctx context.Context) ([]*model.Tag, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TagWhereInput) (*model.TagConnection, error)
	Create(ctx context.Context, input model.CreateTagInput) (*model.Tag, error)
	Update(ctx context.Context, input model.UpdateTagInput) (*model.Tag, error)
}

// NewTagUsecase generates test user repository
func NewTagUsecase(r repository.Tag) Tag {
	return &tagUsecase{tagRepository: r}
}

func (u *tagUsecase) Get(ctx context.Context, where *model.TagWhereInput) (*model.Tag, error) {
	return u.tagRepository.Get(ctx, where)
}

func (u *tagUsecase) List(ctx context.Context) ([]*model.Tag, error) {
	return u.tagRepository.List(ctx)
}

func (u *tagUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TagWhereInput) (*model.TagConnection, error) {
	return u.tagRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *tagUsecase) Create(ctx context.Context, input model.CreateTagInput) (*model.Tag, error) {
	return u.tagRepository.Create(ctx, input)
}

func (u *tagUsecase) Update(ctx context.Context, input model.UpdateTagInput) (*model.Tag, error) {
	return u.tagRepository.Update(ctx, input)
}
