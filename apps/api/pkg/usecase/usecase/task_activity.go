package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskActivityUsecase struct {
	taskActivityRepository repository.TaskActivity
}

// TaskActivity is an interface of test user
type TaskActivity interface {
	Get(ctx context.Context, where *model.TaskActivityWhereInput) (*model.TaskActivity, error)
	List(ctx context.Context) ([]*model.TaskActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityWhereInput) (*model.TaskActivityConnection, error)
	Create(ctx context.Context, input model.CreateTaskActivityInput) (*model.TaskActivity, error)
	Update(ctx context.Context, input model.UpdateTaskActivityInput) (*model.TaskActivity, error)
}

// NewTaskActivityUsecase generates test user repository
func NewTaskActivityUsecase(r repository.TaskActivity) TaskActivity {
	return &taskActivityUsecase{taskActivityRepository: r}
}

func (u *taskActivityUsecase) Get(ctx context.Context, where *model.TaskActivityWhereInput) (*model.TaskActivity, error) {
	return u.taskActivityRepository.Get(ctx, where)
}

func (u *taskActivityUsecase) List(ctx context.Context) ([]*model.TaskActivity, error) {
	return u.taskActivityRepository.List(ctx)
}

func (u *taskActivityUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityWhereInput) (*model.TaskActivityConnection, error) {
	return u.taskActivityRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskActivityUsecase) Create(ctx context.Context, input model.CreateTaskActivityInput) (*model.TaskActivity, error) {
	return u.taskActivityRepository.Create(ctx, input)
}

func (u *taskActivityUsecase) Update(ctx context.Context, input model.UpdateTaskActivityInput) (*model.TaskActivity, error) {
	return u.taskActivityRepository.Update(ctx, input)
}
