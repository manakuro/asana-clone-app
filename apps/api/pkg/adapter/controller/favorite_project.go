package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// FavoriteProject is an interface of controller.
type FavoriteProject interface {
	Get(ctx context.Context, where *model.FavoriteProjectWhereInput) (*model.FavoriteProject, error)
	List(ctx context.Context) ([]*model.FavoriteProject, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteProjectWhereInput) (*model.FavoriteProjectConnection, error)
	Create(ctx context.Context, input model.CreateFavoriteProjectInput) (*model.FavoriteProject, error)
	Update(ctx context.Context, input model.UpdateFavoriteProjectInput) (*model.FavoriteProject, error)
	Delete(ctx context.Context, input model.DeleteFavoriteProjectInput) (*model.FavoriteProject, error)
	FavoriteProjectIDs(ctx context.Context, teammateID model.ID) ([]model.ID, error)
}

type favoriteProjectController struct {
	favoriteProjectUsecase usecase.FavoriteProject
}

// NewFavoriteProjectController generates favoriteProject controller.
func NewFavoriteProjectController(pt usecase.FavoriteProject) FavoriteProject {
	return &favoriteProjectController{
		favoriteProjectUsecase: pt,
	}
}

func (c *favoriteProjectController) Get(ctx context.Context, where *model.FavoriteProjectWhereInput) (*model.FavoriteProject, error) {
	return c.favoriteProjectUsecase.Get(ctx, where)
}

func (c *favoriteProjectController) List(ctx context.Context) ([]*model.FavoriteProject, error) {
	return c.favoriteProjectUsecase.List(ctx)
}

func (c *favoriteProjectController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteProjectWhereInput) (*model.FavoriteProjectConnection, error) {
	return c.favoriteProjectUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *favoriteProjectController) Create(ctx context.Context, input model.CreateFavoriteProjectInput) (*model.FavoriteProject, error) {
	return c.favoriteProjectUsecase.Create(ctx, input)
}

func (c *favoriteProjectController) Update(ctx context.Context, input model.UpdateFavoriteProjectInput) (*model.FavoriteProject, error) {
	return c.favoriteProjectUsecase.Update(ctx, input)
}

func (c *favoriteProjectController) Delete(ctx context.Context, input model.DeleteFavoriteProjectInput) (*model.FavoriteProject, error) {
	return c.favoriteProjectUsecase.Delete(ctx, input)
}

func (c *favoriteProjectController) FavoriteProjectIDs(ctx context.Context, teammateID model.ID) ([]model.ID, error) {
	return c.favoriteProjectUsecase.FavoriteProjectIDs(ctx, teammateID)
}
