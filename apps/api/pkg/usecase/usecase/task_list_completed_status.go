package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskListCompletedStatusUsecase struct {
	taskListCompletedStatusRepository repository.TaskListCompletedStatus
}

// TaskListCompletedStatus is an interface of test user
type TaskListCompletedStatus interface {
	Get(ctx context.Context, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatus, error)
	List(ctx context.Context) ([]*model.TaskListCompletedStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatusConnection, error)
	Create(ctx context.Context, input model.CreateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error)
	Update(ctx context.Context, input model.UpdateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error)
}

// NewTaskListCompletedStatusUsecase generates test user repository
func NewTaskListCompletedStatusUsecase(r repository.TaskListCompletedStatus) TaskListCompletedStatus {
	return &taskListCompletedStatusUsecase{taskListCompletedStatusRepository: r}
}

func (u *taskListCompletedStatusUsecase) Get(ctx context.Context, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatus, error) {
	return u.taskListCompletedStatusRepository.Get(ctx, where)
}

func (u *taskListCompletedStatusUsecase) List(ctx context.Context) ([]*model.TaskListCompletedStatus, error) {
	return u.taskListCompletedStatusRepository.List(ctx)
}

func (u *taskListCompletedStatusUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatusConnection, error) {
	return u.taskListCompletedStatusRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskListCompletedStatusUsecase) Create(ctx context.Context, input model.CreateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error) {
	return u.taskListCompletedStatusRepository.Create(ctx, input)
}

func (u *taskListCompletedStatusUsecase) Update(ctx context.Context, input model.UpdateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error) {
	return u.taskListCompletedStatusRepository.Update(ctx, input)
}
