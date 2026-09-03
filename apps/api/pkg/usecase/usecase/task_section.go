package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskSectionUsecase struct {
	taskSectionRepository repository.TaskSection
}

// TaskSection is an interface of test user
type TaskSection interface {
	Get(ctx context.Context, where *model.TaskSectionWhereInput) (*model.TaskSection, error)
	List(ctx context.Context) ([]*model.TaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskSectionWhereInput) (*model.TaskSectionConnection, error)
	Create(ctx context.Context, input model.CreateTaskSectionInput) (*model.TaskSection, error)
	Update(ctx context.Context, input model.UpdateTaskSectionInput) (*model.TaskSection, error)
}

// NewTaskSectionUsecase generates test user repository
func NewTaskSectionUsecase(r repository.TaskSection) TaskSection {
	return &taskSectionUsecase{taskSectionRepository: r}
}

func (u *taskSectionUsecase) Get(ctx context.Context, where *model.TaskSectionWhereInput) (*model.TaskSection, error) {
	return u.taskSectionRepository.Get(ctx, where)
}

func (u *taskSectionUsecase) List(ctx context.Context) ([]*model.TaskSection, error) {
	return u.taskSectionRepository.List(ctx)
}

func (u *taskSectionUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskSectionWhereInput) (*model.TaskSectionConnection, error) {
	return u.taskSectionRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskSectionUsecase) Create(ctx context.Context, input model.CreateTaskSectionInput) (*model.TaskSection, error) {
	return u.taskSectionRepository.Create(ctx, input)
}

func (u *taskSectionUsecase) Update(ctx context.Context, input model.UpdateTaskSectionInput) (*model.TaskSection, error) {
	return u.taskSectionRepository.Update(ctx, input)
}
