package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type favoriteProjectUsecase struct {
	favoriteProjectRepository repository.FavoriteProject
}

// FavoriteProject is an interface of test user
type FavoriteProject interface {
	Get(ctx context.Context, where *model.FavoriteProjectWhereInput) (*model.FavoriteProject, error)
	List(ctx context.Context) ([]*model.FavoriteProject, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteProjectWhereInput) (*model.FavoriteProjectConnection, error)
	Create(ctx context.Context, input model.CreateFavoriteProjectInput) (*model.FavoriteProject, error)
	Update(ctx context.Context, input model.UpdateFavoriteProjectInput) (*model.FavoriteProject, error)
	Delete(ctx context.Context, input model.DeleteFavoriteProjectInput) (*model.FavoriteProject, error)
	FavoriteProjectIDs(ctx context.Context, teammateID model.ID) ([]model.ID, error)
}

// NewFavoriteProjectUsecase generates test user repository
func NewFavoriteProjectUsecase(r repository.FavoriteProject) FavoriteProject {
	return &favoriteProjectUsecase{favoriteProjectRepository: r}
}

func (u *favoriteProjectUsecase) Get(ctx context.Context, where *model.FavoriteProjectWhereInput) (*model.FavoriteProject, error) {
	return u.favoriteProjectRepository.Get(ctx, where)
}

func (u *favoriteProjectUsecase) List(ctx context.Context) ([]*model.FavoriteProject, error) {
	return u.favoriteProjectRepository.List(ctx)
}

func (u *favoriteProjectUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteProjectWhereInput) (*model.FavoriteProjectConnection, error) {
	return u.favoriteProjectRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *favoriteProjectUsecase) Create(ctx context.Context, input model.CreateFavoriteProjectInput) (*model.FavoriteProject, error) {
	return u.favoriteProjectRepository.Create(ctx, input)
}

func (u *favoriteProjectUsecase) Update(ctx context.Context, input model.UpdateFavoriteProjectInput) (*model.FavoriteProject, error) {
	return u.favoriteProjectRepository.Update(ctx, input)
}

func (u *favoriteProjectUsecase) Delete(ctx context.Context, input model.DeleteFavoriteProjectInput) (*model.FavoriteProject, error) {
	return u.favoriteProjectRepository.Delete(ctx, input)
}

func (u *favoriteProjectUsecase) FavoriteProjectIDs(ctx context.Context, teammateID model.ID) ([]model.ID, error) {
	return u.favoriteProjectRepository.FavoriteProjectIDs(ctx, teammateID)
}
