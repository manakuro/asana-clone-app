package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// FavoriteProject is interface of repository
type FavoriteProject interface {
	Get(ctx context.Context, where *model.FavoriteProjectWhereInput) (*model.FavoriteProject, error)
	List(ctx context.Context) ([]*model.FavoriteProject, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteProjectWhereInput) (*model.FavoriteProjectConnection, error)
	Create(ctx context.Context, input model.CreateFavoriteProjectInput) (*model.FavoriteProject, error)
	Update(ctx context.Context, input model.UpdateFavoriteProjectInput) (*model.FavoriteProject, error)
	Delete(ctx context.Context, input model.DeleteFavoriteProjectInput) (*model.FavoriteProject, error)
	FavoriteProjectIDs(ctx context.Context, teammateID model.ID) ([]model.ID, error)
}
