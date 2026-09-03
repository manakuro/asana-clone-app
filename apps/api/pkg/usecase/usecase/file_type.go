package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type fileTypeUsecase struct {
	fileTypeRepository repository.FileType
}

// FileType is an interface of test user
type FileType interface {
	Get(ctx context.Context, where *model.FileTypeWhereInput) (*model.FileType, error)
	List(ctx context.Context) ([]*model.FileType, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FileTypeWhereInput) (*model.FileTypeConnection, error)
	Create(ctx context.Context, input model.CreateFileTypeInput) (*model.FileType, error)
	Update(ctx context.Context, input model.UpdateFileTypeInput) (*model.FileType, error)
}

// NewFileTypeUsecase generates test user repository
func NewFileTypeUsecase(r repository.FileType) FileType {
	return &fileTypeUsecase{fileTypeRepository: r}
}

func (u *fileTypeUsecase) Get(ctx context.Context, where *model.FileTypeWhereInput) (*model.FileType, error) {
	return u.fileTypeRepository.Get(ctx, where)
}

func (u *fileTypeUsecase) List(ctx context.Context) ([]*model.FileType, error) {
	return u.fileTypeRepository.List(ctx)
}

func (u *fileTypeUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FileTypeWhereInput) (*model.FileTypeConnection, error) {
	return u.fileTypeRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *fileTypeUsecase) Create(ctx context.Context, input model.CreateFileTypeInput) (*model.FileType, error) {
	return u.fileTypeRepository.Create(ctx, input)
}

func (u *fileTypeUsecase) Update(ctx context.Context, input model.UpdateFileTypeInput) (*model.FileType, error) {
	return u.fileTypeRepository.Update(ctx, input)
}
