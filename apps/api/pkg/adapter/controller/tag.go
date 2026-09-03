package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// Tag is an interface of controller.
type Tag interface {
	Get(ctx context.Context, where *model.TagWhereInput) (*model.Tag, error)
	List(ctx context.Context) ([]*model.Tag, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TagWhereInput) (*model.TagConnection, error)
	Create(ctx context.Context, input model.CreateTagInput) (*model.Tag, error)
	Update(ctx context.Context, input model.UpdateTagInput) (*model.Tag, error)
}

type tagController struct {
	tagUsecase usecase.Tag
}

// NewTagController generates tag controller.
func NewTagController(pt usecase.Tag) Tag {
	return &tagController{
		tagUsecase: pt,
	}
}

func (c *tagController) Get(ctx context.Context, where *model.TagWhereInput) (*model.Tag, error) {
	return c.tagUsecase.Get(ctx, where)
}

func (c *tagController) List(ctx context.Context) ([]*model.Tag, error) {
	return c.tagUsecase.List(ctx)
}

func (c *tagController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TagWhereInput) (*model.TagConnection, error) {
	return c.tagUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *tagController) Create(ctx context.Context, input model.CreateTagInput) (*model.Tag, error) {
	return c.tagUsecase.Create(ctx, input)
}

func (c *tagController) Update(ctx context.Context, input model.UpdateTagInput) (*model.Tag, error) {
	return c.tagUsecase.Update(ctx, input)
}
