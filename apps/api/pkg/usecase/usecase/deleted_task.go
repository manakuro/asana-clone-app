package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type deletedTaskUsecase struct {
	deletedTaskRepository repository.DeletedTask
}

// DeletedTask is an interface of usecase.
type DeletedTask interface {
	Get(ctx context.Context, where *model.DeletedTaskWhereInput) (*model.DeletedTask, error)
	List(ctx context.Context) ([]*model.DeletedTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.DeletedTaskWhereInput) (*model.DeletedTaskConnection, error)
	Create(ctx context.Context, input model.CreateDeletedTaskInput) (*model.DeletedTask, error)
	Update(ctx context.Context, input model.UpdateDeletedTaskInput) (*model.DeletedTask, error)
	Delete(ctx context.Context, input model.DeleteDeletedTaskInput) (*model.DeletedTask, error)
	Undelete(ctx context.Context, input model.UndeleteDeletedTaskInput) ([]*model.DeletedTask, error)
}

// NewDeletedTaskUsecase generates a repository.
func NewDeletedTaskUsecase(ttr repository.DeletedTask) DeletedTask {
	return &deletedTaskUsecase{deletedTaskRepository: ttr}
}

func (u *deletedTaskUsecase) Get(ctx context.Context, where *model.DeletedTaskWhereInput) (*model.DeletedTask, error) {
	return u.deletedTaskRepository.Get(ctx, where)
}

func (u *deletedTaskUsecase) List(ctx context.Context) ([]*model.DeletedTask, error) {
	return u.deletedTaskRepository.List(ctx)
}

func (u *deletedTaskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.DeletedTaskWhereInput) (*model.DeletedTaskConnection, error) {
	return u.deletedTaskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *deletedTaskUsecase) Create(ctx context.Context, input model.CreateDeletedTaskInput) (*model.DeletedTask, error) {
	return u.deletedTaskRepository.Create(ctx, input)
}

func (u *deletedTaskUsecase) Update(ctx context.Context, input model.UpdateDeletedTaskInput) (*model.DeletedTask, error) {
	return u.deletedTaskRepository.Update(ctx, input)
}

func (u *deletedTaskUsecase) Delete(ctx context.Context, input model.DeleteDeletedTaskInput) (*model.DeletedTask, error) {
	return u.deletedTaskRepository.Delete(ctx, input)
}

func (u *deletedTaskUsecase) Undelete(ctx context.Context, input model.UndeleteDeletedTaskInput) ([]*model.DeletedTask, error) {
	return u.deletedTaskRepository.Undelete(ctx, input)
}
