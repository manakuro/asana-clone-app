package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskColumnUsecase struct {
	taskColumnRepository repository.TaskColumn
}

// TaskColumn is an interface of test user
type TaskColumn interface {
	Get(ctx context.Context, where *model.TaskColumnWhereInput) (*model.TaskColumn, error)
	List(ctx context.Context) ([]*model.TaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskColumnWhereInput) (*model.TaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateTaskColumnInput) (*model.TaskColumn, error)
	Update(ctx context.Context, input model.UpdateTaskColumnInput) (*model.TaskColumn, error)
}

// NewTaskColumnUsecase generates test user repository
func NewTaskColumnUsecase(r repository.TaskColumn) TaskColumn {
	return &taskColumnUsecase{taskColumnRepository: r}
}

func (u *taskColumnUsecase) Get(ctx context.Context, where *model.TaskColumnWhereInput) (*model.TaskColumn, error) {
	return u.taskColumnRepository.Get(ctx, where)
}

func (u *taskColumnUsecase) List(ctx context.Context) ([]*model.TaskColumn, error) {
	return u.taskColumnRepository.List(ctx)
}

func (u *taskColumnUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskColumnWhereInput) (*model.TaskColumnConnection, error) {
	return u.taskColumnRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskColumnUsecase) Create(ctx context.Context, input model.CreateTaskColumnInput) (*model.TaskColumn, error) {
	return u.taskColumnRepository.Create(ctx, input)
}

func (u *taskColumnUsecase) Update(ctx context.Context, input model.UpdateTaskColumnInput) (*model.TaskColumn, error) {
	return u.taskColumnRepository.Update(ctx, input)
}
