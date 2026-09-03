package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskListSortStatusUsecase struct {
	taskListSortStatusRepository repository.TaskListSortStatus
}

// TaskListSortStatus is an interface of test user
type TaskListSortStatus interface {
	Get(ctx context.Context, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatus, error)
	List(ctx context.Context) ([]*model.TaskListSortStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatusConnection, error)
	Create(ctx context.Context, input model.CreateTaskListSortStatusInput) (*model.TaskListSortStatus, error)
	Update(ctx context.Context, input model.UpdateTaskListSortStatusInput) (*model.TaskListSortStatus, error)
}

// NewTaskListSortStatusUsecase generates test user repository
func NewTaskListSortStatusUsecase(r repository.TaskListSortStatus) TaskListSortStatus {
	return &taskListSortStatusUsecase{taskListSortStatusRepository: r}
}

func (u *taskListSortStatusUsecase) Get(ctx context.Context, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatus, error) {
	return u.taskListSortStatusRepository.Get(ctx, where)
}

func (u *taskListSortStatusUsecase) List(ctx context.Context) ([]*model.TaskListSortStatus, error) {
	return u.taskListSortStatusRepository.List(ctx)
}

func (u *taskListSortStatusUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatusConnection, error) {
	return u.taskListSortStatusRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskListSortStatusUsecase) Create(ctx context.Context, input model.CreateTaskListSortStatusInput) (*model.TaskListSortStatus, error) {
	return u.taskListSortStatusRepository.Create(ctx, input)
}

func (u *taskListSortStatusUsecase) Update(ctx context.Context, input model.UpdateTaskListSortStatusInput) (*model.TaskListSortStatus, error) {
	return u.taskListSortStatusRepository.Update(ctx, input)
}
