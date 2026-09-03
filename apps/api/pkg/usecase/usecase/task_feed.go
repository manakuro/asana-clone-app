package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskFeedUsecase struct {
	taskFeedRepository repository.TaskFeed
}

// TaskFeed is an interface of usecase.
type TaskFeed interface {
	Get(ctx context.Context, where *model.TaskFeedWhereInput) (*model.TaskFeed, error)
	List(ctx context.Context, where *model.TaskFeedWhereInput) ([]*model.TaskFeed, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedWhereInput) (*model.TaskFeedConnection, error)
	Create(ctx context.Context, input model.CreateTaskFeedInput) (*model.TaskFeed, error)
	Update(ctx context.Context, input model.UpdateTaskFeedInput) (*model.TaskFeed, error)
	Delete(ctx context.Context, input model.DeleteTaskFeedInput) (*model.DeleteTaskFeedInputPayload, error)
	Undelete(ctx context.Context, input model.UndeleteTaskFeedInput) (*model.UndeleteTaskFeedInputPayload, error)
}

// NewTaskFeedUsecase generates a repository.
func NewTaskFeedUsecase(r repository.TaskFeed) TaskFeed {
	return &taskFeedUsecase{taskFeedRepository: r}
}

func (u *taskFeedUsecase) Get(ctx context.Context, where *model.TaskFeedWhereInput) (*model.TaskFeed, error) {
	return u.taskFeedRepository.Get(ctx, where)
}

func (u *taskFeedUsecase) List(ctx context.Context, where *model.TaskFeedWhereInput) ([]*model.TaskFeed, error) {
	return u.taskFeedRepository.List(ctx, where)
}

func (u *taskFeedUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedWhereInput) (*model.TaskFeedConnection, error) {
	return u.taskFeedRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskFeedUsecase) Create(ctx context.Context, input model.CreateTaskFeedInput) (*model.TaskFeed, error) {
	return u.taskFeedRepository.Create(ctx, input)
}

func (u *taskFeedUsecase) Update(ctx context.Context, input model.UpdateTaskFeedInput) (*model.TaskFeed, error) {
	return u.taskFeedRepository.Update(ctx, input)
}

func (u *taskFeedUsecase) Delete(ctx context.Context, input model.DeleteTaskFeedInput) (*model.DeleteTaskFeedInputPayload, error) {
	return u.taskFeedRepository.Delete(ctx, input)
}

func (u *taskFeedUsecase) Undelete(ctx context.Context, input model.UndeleteTaskFeedInput) (*model.UndeleteTaskFeedInputPayload, error) {
	return u.taskFeedRepository.Undelete(ctx, input)
}
