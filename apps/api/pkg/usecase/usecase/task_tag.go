package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskTagUsecase struct {
	taskTagRepository repository.TaskTag
}

// TaskTag is an interface of usecase.
type TaskTag interface {
	Get(ctx context.Context, where *model.TaskTagWhereInput) (*model.TaskTag, error)
	List(ctx context.Context, where *model.TaskTagWhereInput) ([]*model.TaskTag, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskTagWhereInput) (*model.TaskTagConnection, error)
	Create(ctx context.Context, input model.CreateTaskTagInput) (*model.TaskTag, error)
	Update(ctx context.Context, input model.UpdateTaskTagInput) (*model.TaskTag, error)
	Delete(ctx context.Context, input model.DeleteTaskTagInput) (*model.TaskTag, error)
}

// NewTaskTagUsecase generates a repository.
func NewTaskTagUsecase(r repository.TaskTag) TaskTag {
	return &taskTagUsecase{taskTagRepository: r}
}

func (u *taskTagUsecase) Get(ctx context.Context, where *model.TaskTagWhereInput) (*model.TaskTag, error) {
	return u.taskTagRepository.Get(ctx, where)
}

func (u *taskTagUsecase) List(ctx context.Context, where *model.TaskTagWhereInput) ([]*model.TaskTag, error) {
	return u.taskTagRepository.List(ctx, where)
}

func (u *taskTagUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskTagWhereInput) (*model.TaskTagConnection, error) {
	return u.taskTagRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskTagUsecase) Create(ctx context.Context, input model.CreateTaskTagInput) (*model.TaskTag, error) {
	return u.taskTagRepository.Create(ctx, input)
}

func (u *taskTagUsecase) Update(ctx context.Context, input model.UpdateTaskTagInput) (*model.TaskTag, error) {
	return u.taskTagRepository.Update(ctx, input)
}

func (u *taskTagUsecase) Delete(ctx context.Context, input model.DeleteTaskTagInput) (*model.TaskTag, error) {
	return u.taskTagRepository.Delete(ctx, input)
}
