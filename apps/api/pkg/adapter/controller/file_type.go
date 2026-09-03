package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// FileType is an interface of controller.
type FileType interface {
	Get(ctx context.Context, where *model.FileTypeWhereInput) (*model.FileType, error)
	List(ctx context.Context) ([]*model.FileType, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FileTypeWhereInput) (*model.FileTypeConnection, error)
	Create(ctx context.Context, input model.CreateFileTypeInput) (*model.FileType, error)
	Update(ctx context.Context, input model.UpdateFileTypeInput) (*model.FileType, error)
}

type fileTypeController struct {
	fileTypeUsecase usecase.FileType
}

// NewFileTypeController generates fileType controller.
func NewFileTypeController(pt usecase.FileType) FileType {
	return &fileTypeController{
		fileTypeUsecase: pt,
	}
}

func (c *fileTypeController) Get(ctx context.Context, where *model.FileTypeWhereInput) (*model.FileType, error) {
	return c.fileTypeUsecase.Get(ctx, where)
}

func (c *fileTypeController) List(ctx context.Context) ([]*model.FileType, error) {
	return c.fileTypeUsecase.List(ctx)
}

func (c *fileTypeController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FileTypeWhereInput) (*model.FileTypeConnection, error) {
	return c.fileTypeUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *fileTypeController) Create(ctx context.Context, input model.CreateFileTypeInput) (*model.FileType, error) {
	return c.fileTypeUsecase.Create(ctx, input)
}

func (c *fileTypeController) Update(ctx context.Context, input model.UpdateFileTypeInput) (*model.FileType, error) {
	return c.fileTypeUsecase.Update(ctx, input)
}
