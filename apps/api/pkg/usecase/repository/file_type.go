package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// FileType is interface of repository
type FileType interface {
	Get(ctx context.Context, where *model.FileTypeWhereInput) (*model.FileType, error)
	List(ctx context.Context) ([]*model.FileType, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FileTypeWhereInput) (*model.FileTypeConnection, error)
	Create(ctx context.Context, input model.CreateFileTypeInput) (*model.FileType, error)
	Update(ctx context.Context, input model.UpdateFileTypeInput) (*model.FileType, error)
}
