package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type favoriteWorkspaceUsecase struct {
	favoriteWorkspaceRepository repository.FavoriteWorkspace
}

// FavoriteWorkspace is an interface of test user
type FavoriteWorkspace interface {
	Get(ctx context.Context, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspace, error)
	List(ctx context.Context) ([]*model.FavoriteWorkspace, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspaceConnection, error)
	Create(ctx context.Context, input model.CreateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	Update(ctx context.Context, input model.UpdateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	Delete(ctx context.Context, input model.DeleteFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	FavoriteWorkspaceIDs(ctx context.Context, teammateID model.ID, workspaceID *model.ID) ([]model.ID, error)
}

// NewFavoriteWorkspaceUsecase generates test user repository
func NewFavoriteWorkspaceUsecase(r repository.FavoriteWorkspace) FavoriteWorkspace {
	return &favoriteWorkspaceUsecase{favoriteWorkspaceRepository: r}
}

func (u *favoriteWorkspaceUsecase) Get(ctx context.Context, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspace, error) {
	return u.favoriteWorkspaceRepository.Get(ctx, where)
}

func (u *favoriteWorkspaceUsecase) List(ctx context.Context) ([]*model.FavoriteWorkspace, error) {
	return u.favoriteWorkspaceRepository.List(ctx)
}

func (u *favoriteWorkspaceUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspaceConnection, error) {
	return u.favoriteWorkspaceRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *favoriteWorkspaceUsecase) Create(ctx context.Context, input model.CreateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	return u.favoriteWorkspaceRepository.Create(ctx, input)
}

func (u *favoriteWorkspaceUsecase) Update(ctx context.Context, input model.UpdateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	return u.favoriteWorkspaceRepository.Update(ctx, input)
}

func (u *favoriteWorkspaceUsecase) Delete(ctx context.Context, input model.DeleteFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	return u.favoriteWorkspaceRepository.Delete(ctx, input)
}

func (u *favoriteWorkspaceUsecase) FavoriteWorkspaceIDs(ctx context.Context, teammateID model.ID, workspaceID *model.ID) ([]model.ID, error) {
	return u.favoriteWorkspaceRepository.FavoriteWorkspaceIDs(ctx, teammateID, workspaceID)
}
