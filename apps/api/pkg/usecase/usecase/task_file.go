package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskFileUsecase struct {
	taskFileRepository repository.TaskFile
}

// TaskFile is an interface of test user
type TaskFile interface {
	Get(ctx context.Context, where *model.TaskFileWhereInput) (*model.TaskFile, error)
	List(ctx context.Context) ([]*model.TaskFile, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFileWhereInput) (*model.TaskFileConnection, error)
	Create(ctx context.Context, input model.CreateTaskFileInput) (*model.TaskFile, error)
	Update(ctx context.Context, input model.UpdateTaskFileInput) (*model.TaskFile, error)
}

// NewTaskFileUsecase generates test user repository
func NewTaskFileUsecase(r repository.TaskFile) TaskFile {
	return &taskFileUsecase{taskFileRepository: r}
}

func (u *taskFileUsecase) Get(ctx context.Context, where *model.TaskFileWhereInput) (*model.TaskFile, error) {
	return u.taskFileRepository.Get(ctx, where)
}

func (u *taskFileUsecase) List(ctx context.Context) ([]*model.TaskFile, error) {
	return u.taskFileRepository.List(ctx)
}

func (u *taskFileUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFileWhereInput) (*model.TaskFileConnection, error) {
	return u.taskFileRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskFileUsecase) Create(ctx context.Context, input model.CreateTaskFileInput) (*model.TaskFile, error) {
	return u.taskFileRepository.Create(ctx, input)
}

func (u *taskFileUsecase) Update(ctx context.Context, input model.UpdateTaskFileInput) (*model.TaskFile, error) {
	return u.taskFileRepository.Update(ctx, input)
}
