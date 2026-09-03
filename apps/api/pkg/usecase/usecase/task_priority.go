package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskPriorityUsecase struct {
	taskPriorityRepository repository.TaskPriority
}

// TaskPriority is an interface of test user
type TaskPriority interface {
	Get(ctx context.Context, where *model.TaskPriorityWhereInput) (*model.TaskPriority, error)
	List(ctx context.Context) ([]*model.TaskPriority, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskPriorityWhereInput) (*model.TaskPriorityConnection, error)
	Create(ctx context.Context, input model.CreateTaskPriorityInput) (*model.TaskPriority, error)
	Update(ctx context.Context, input model.UpdateTaskPriorityInput) (*model.TaskPriority, error)
}

// NewTaskPriorityUsecase generates test user repository
func NewTaskPriorityUsecase(r repository.TaskPriority) TaskPriority {
	return &taskPriorityUsecase{taskPriorityRepository: r}
}

func (u *taskPriorityUsecase) Get(ctx context.Context, where *model.TaskPriorityWhereInput) (*model.TaskPriority, error) {
	return u.taskPriorityRepository.Get(ctx, where)
}

func (u *taskPriorityUsecase) List(ctx context.Context) ([]*model.TaskPriority, error) {
	return u.taskPriorityRepository.List(ctx)
}

func (u *taskPriorityUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskPriorityWhereInput) (*model.TaskPriorityConnection, error) {
	return u.taskPriorityRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskPriorityUsecase) Create(ctx context.Context, input model.CreateTaskPriorityInput) (*model.TaskPriority, error) {
	return u.taskPriorityRepository.Create(ctx, input)
}

func (u *taskPriorityUsecase) Update(ctx context.Context, input model.UpdateTaskPriorityInput) (*model.TaskPriority, error) {
	return u.taskPriorityRepository.Update(ctx, input)
}
