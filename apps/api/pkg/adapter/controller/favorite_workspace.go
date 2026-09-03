package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// FavoriteWorkspace is an interface of controller.
type FavoriteWorkspace interface {
	Get(ctx context.Context, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspace, error)
	List(ctx context.Context) ([]*model.FavoriteWorkspace, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspaceConnection, error)
	Create(ctx context.Context, input model.CreateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	Update(ctx context.Context, input model.UpdateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	Delete(ctx context.Context, input model.DeleteFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error)
	FavoriteWorkspaceIDs(ctx context.Context, teammateID model.ID, workspaceID *model.ID) ([]model.ID, error)
}

type favoriteWorkspaceController struct {
	favoriteWorkspaceUsecase usecase.FavoriteWorkspace
}

// NewFavoriteWorkspaceController generates favoriteWorkspace controller.
func NewFavoriteWorkspaceController(pt usecase.FavoriteWorkspace) FavoriteWorkspace {
	return &favoriteWorkspaceController{
		favoriteWorkspaceUsecase: pt,
	}
}

func (c *favoriteWorkspaceController) Get(ctx context.Context, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspace, error) {
	return c.favoriteWorkspaceUsecase.Get(ctx, where)
}

func (c *favoriteWorkspaceController) List(ctx context.Context) ([]*model.FavoriteWorkspace, error) {
	return c.favoriteWorkspaceUsecase.List(ctx)
}

func (c *favoriteWorkspaceController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspaceConnection, error) {
	return c.favoriteWorkspaceUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *favoriteWorkspaceController) Create(ctx context.Context, input model.CreateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	return c.favoriteWorkspaceUsecase.Create(ctx, input)
}

func (c *favoriteWorkspaceController) Update(ctx context.Context, input model.UpdateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	return c.favoriteWorkspaceUsecase.Update(ctx, input)
}

func (c *favoriteWorkspaceController) Delete(ctx context.Context, input model.DeleteFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	return c.favoriteWorkspaceUsecase.Delete(ctx, input)
}

func (c *favoriteWorkspaceController) FavoriteWorkspaceIDs(ctx context.Context, teammateID model.ID, workspaceID *model.ID) ([]model.ID, error) {
	return c.favoriteWorkspaceUsecase.FavoriteWorkspaceIDs(ctx, teammateID, workspaceID)
}
