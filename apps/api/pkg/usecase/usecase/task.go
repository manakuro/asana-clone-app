package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskUsecase struct {
	taskRepository repository.Task
}

// Task is an interface of test user
type Task interface {
	Get(ctx context.Context, where *model.TaskWhereInput) (*model.Task, error)
	List(ctx context.Context) ([]*model.Task, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskWhereInput) (*model.TaskConnection, error)
	Create(ctx context.Context, input model.CreateTaskInput) (*model.Task, error)
	Update(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error)
	Delete(ctx context.Context, input model.DeleteTaskInput) (*model.DeleteTaskPayload, error)
	DeleteAll(ctx context.Context, input model.DeleteAllTaskInput) (*model.DeleteAllTaskPayload, error)
	Undelete(ctx context.Context, input model.UndeleteTaskInput) (*model.UndeleteTaskPayload, error)
	UndeleteAll(ctx context.Context, input model.UndeleteAllTaskInput) (*model.UndeleteAllTaskPayload, error)
	Assign(ctx context.Context, input model.AssignTaskInput) (*model.AssignTaskPayload, error)
	Unassign(ctx context.Context, input model.UnassignTaskInput) (*model.UnassignTaskPayload, error)
}

// NewTaskUsecase generates test user repository
func NewTaskUsecase(r repository.Task) Task {
	return &taskUsecase{taskRepository: r}
}

func (u *taskUsecase) Get(ctx context.Context, where *model.TaskWhereInput) (*model.Task, error) {
	return u.taskRepository.Get(ctx, where)
}

func (u *taskUsecase) List(ctx context.Context) ([]*model.Task, error) {
	return u.taskRepository.List(ctx)
}

func (u *taskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskWhereInput) (*model.TaskConnection, error) {
	return u.taskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskUsecase) Create(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
	return u.taskRepository.Create(ctx, input)
}

func (u *taskUsecase) Update(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error) {
	return u.taskRepository.Update(ctx, input)
}

func (u *taskUsecase) Delete(ctx context.Context, input model.DeleteTaskInput) (*model.DeleteTaskPayload, error) {
	return u.taskRepository.Delete(ctx, input)
}

func (u *taskUsecase) DeleteAll(ctx context.Context, input model.DeleteAllTaskInput) (*model.DeleteAllTaskPayload, error) {
	return u.taskRepository.DeleteAll(ctx, input)
}

func (u *taskUsecase) Undelete(ctx context.Context, input model.UndeleteTaskInput) (*model.UndeleteTaskPayload, error) {
	return u.taskRepository.Undelete(ctx, input)
}

func (u *taskUsecase) UndeleteAll(ctx context.Context, input model.UndeleteAllTaskInput) (*model.UndeleteAllTaskPayload, error) {
	return u.taskRepository.UndeleteAll(ctx, input)
}

func (u *taskUsecase) Assign(ctx context.Context, input model.AssignTaskInput) (*model.AssignTaskPayload, error) {
	return u.taskRepository.Assign(ctx, input)
}

func (u *taskUsecase) Unassign(ctx context.Context, input model.UnassignTaskInput) (*model.UnassignTaskPayload, error) {
	return u.taskRepository.Unassign(ctx, input)
}
