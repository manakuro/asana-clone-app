package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type taskCollaboratorUsecase struct {
	taskCollaboratorRepository repository.TaskCollaborator
}

// TaskCollaborator is an interface of usecase.
type TaskCollaborator interface {
	Get(ctx context.Context, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaborator, error)
	List(ctx context.Context, where *model.TaskCollaboratorWhereInput) ([]*model.TaskCollaborator, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaboratorConnection, error)
	Create(ctx context.Context, input model.CreateTaskCollaboratorInput) (*model.TaskCollaborator, error)
	Update(ctx context.Context, input model.UpdateTaskCollaboratorInput) (*model.TaskCollaborator, error)
	Delete(ctx context.Context, input model.DeleteTaskCollaboratorInput) (*model.TaskCollaborator, error)
}

// NewTaskCollaboratorUsecase generates a repository.
func NewTaskCollaboratorUsecase(r repository.TaskCollaborator) TaskCollaborator {
	return &taskCollaboratorUsecase{taskCollaboratorRepository: r}
}

func (u *taskCollaboratorUsecase) Get(ctx context.Context, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaborator, error) {
	return u.taskCollaboratorRepository.Get(ctx, where)
}

func (u *taskCollaboratorUsecase) List(ctx context.Context, where *model.TaskCollaboratorWhereInput) ([]*model.TaskCollaborator, error) {
	return u.taskCollaboratorRepository.List(ctx, where)
}

func (u *taskCollaboratorUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaboratorConnection, error) {
	return u.taskCollaboratorRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *taskCollaboratorUsecase) Create(ctx context.Context, input model.CreateTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	return u.taskCollaboratorRepository.Create(ctx, input)
}

func (u *taskCollaboratorUsecase) Update(ctx context.Context, input model.UpdateTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	return u.taskCollaboratorRepository.Update(ctx, input)
}

func (u *taskCollaboratorUsecase) Delete(ctx context.Context, input model.DeleteTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	return u.taskCollaboratorRepository.Delete(ctx, input)
}
