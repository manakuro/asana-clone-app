package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskFeedLikeUsecase struct {
	taskFeedLikeRepository repository.TaskFeedLike
}

// TaskFeedLike is an interface of usecase.
type TaskFeedLike interface {
	Get(ctx context.Context, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLike, error)
	List(ctx context.Context, where *model.TaskFeedLikeWhereInput) ([]*model.TaskFeedLike, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLikeConnection, error)
	Create(ctx context.Context, input model.CreateTaskFeedLikeInput) (*model.TaskFeedLike, error)
	Update(ctx context.Context, input model.UpdateTaskFeedLikeInput) (*model.TaskFeedLike, error)
	Delete(ctx context.Context, input model.DeleteTaskFeedLikeInput) (*model.TaskFeedLike, error)
}

// NewTaskFeedLikeUsecase generates a repository.
func NewTaskFeedLikeUsecase(r repository.TaskFeedLike) TaskFeedLike {
	return &taskFeedLikeUsecase{taskFeedLikeRepository: r}
}

func (u *taskFeedLikeUsecase) Get(ctx context.Context, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLike, error) {
	return u.taskFeedLikeRepository.Get(ctx, where)
}

func (u *taskFeedLikeUsecase) List(ctx context.Context, where *model.TaskFeedLikeWhereInput) ([]*model.TaskFeedLike, error) {
	return u.taskFeedLikeRepository.List(ctx, where)
}

func (u *taskFeedLikeUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLikeConnection, error) {
	return u.taskFeedLikeRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskFeedLikeUsecase) Create(ctx context.Context, input model.CreateTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	return u.taskFeedLikeRepository.Create(ctx, input)
}

func (u *taskFeedLikeUsecase) Update(ctx context.Context, input model.UpdateTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	return u.taskFeedLikeRepository.Update(ctx, input)
}

func (u *taskFeedLikeUsecase) Delete(ctx context.Context, input model.DeleteTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	return u.taskFeedLikeRepository.Delete(ctx, input)
}
