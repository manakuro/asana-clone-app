package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// FavoriteWorkspace is interface of repository
type FavoriteWorkspace interface {
	Get(ctx context.Context, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspace, error)
	List(ctx context.Context) ([]*model.FavoriteWorkspace, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspaceConnection, error)
	Create(ctx context.Context, input model.CreateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	Update(ctx context.Context, input model.UpdateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	Delete(ctx context.Context, input model.DeleteFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	FavoriteWorkspaceIDs(ctx context.Context, teammateID model.ID, workspaceID *model.ID) ([]model.ID, error)
}
