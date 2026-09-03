package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskLikeUsecase struct {
	taskLikeRepository repository.TaskLike
}

// TaskLike is an interface of usecase.
type TaskLike interface {
	Get(ctx context.Context, where *model.TaskLikeWhereInput) (*model.TaskLike, error)
	List(ctx context.Context, where *model.TaskLikeWhereInput) ([]*model.TaskLike, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskLikeWhereInput) (*model.TaskLikeConnection, error)
	Create(ctx context.Context, input model.CreateTaskLikeInput) (*model.TaskLike, error)
	Update(ctx context.Context, input model.UpdateTaskLikeInput) (*model.TaskLike, error)
	Delete(ctx context.Context, input model.DeleteTaskLikeInput) (*model.TaskLike, error)
}

// NewTaskLikeUsecase generates a repository.
func NewTaskLikeUsecase(r repository.TaskLike) TaskLike {
	return &taskLikeUsecase{taskLikeRepository: r}
}

func (u *taskLikeUsecase) Get(ctx context.Context, where *model.TaskLikeWhereInput) (*model.TaskLike, error) {
	return u.taskLikeRepository.Get(ctx, where)
}

func (u *taskLikeUsecase) List(ctx context.Context, where *model.TaskLikeWhereInput) ([]*model.TaskLike, error) {
	return u.taskLikeRepository.List(ctx, where)
}

func (u *taskLikeUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskLikeWhereInput) (*model.TaskLikeConnection, error) {
	return u.taskLikeRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskLikeUsecase) Create(ctx context.Context, input model.CreateTaskLikeInput) (*model.TaskLike, error) {
	return u.taskLikeRepository.Create(ctx, input)
}

func (u *taskLikeUsecase) Update(ctx context.Context, input model.UpdateTaskLikeInput) (*model.TaskLike, error) {
	return u.taskLikeRepository.Update(ctx, input)
}

func (u *taskLikeUsecase) Delete(ctx context.Context, input model.DeleteTaskLikeInput) (*model.TaskLike, error) {
	return u.taskLikeRepository.Delete(ctx, input)
}
