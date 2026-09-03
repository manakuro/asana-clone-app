package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskActivityTaskUsecase struct {
	taskActivityTaskRepository repository.TaskActivityTask
}

// TaskActivityTask is an interface of test user
type TaskActivityTask interface {
	Get(ctx context.Context, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTask, error)
	List(ctx context.Context) ([]*model.TaskActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateTaskActivityTaskInput) (*model.TaskActivityTask, error)
	Update(ctx context.Context, input model.UpdateTaskActivityTaskInput) (*model.TaskActivityTask, error)
}

// NewTaskActivityTaskUsecase generates test user repository
func NewTaskActivityTaskUsecase(r repository.TaskActivityTask) TaskActivityTask {
	return &taskActivityTaskUsecase{taskActivityTaskRepository: r}
}

func (u *taskActivityTaskUsecase) Get(ctx context.Context, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTask, error) {
	return u.taskActivityTaskRepository.Get(ctx, where)
}

func (u *taskActivityTaskUsecase) List(ctx context.Context) ([]*model.TaskActivityTask, error) {
	return u.taskActivityTaskRepository.List(ctx)
}

func (u *taskActivityTaskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTaskConnection, error) {
	return u.taskActivityTaskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskActivityTaskUsecase) Create(ctx context.Context, input model.CreateTaskActivityTaskInput) (*model.TaskActivityTask, error) {
	return u.taskActivityTaskRepository.Create(ctx, input)
}

func (u *taskActivityTaskUsecase) Update(ctx context.Context, input model.UpdateTaskActivityTaskInput) (*model.TaskActivityTask, error) {
	return u.taskActivityTaskRepository.Update(ctx, input)
}
