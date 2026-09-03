package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type teammateTaskUsecase struct {
	teammateTaskRepository repository.TeammateTask
}

// TeammateTask is an interface of usecase.
type TeammateTask interface {
	Get(ctx context.Context, where *model.TeammateTaskWhereInput) (*model.TeammateTask, error)
	List(ctx context.Context) ([]*model.TeammateTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskWhereInput) (*model.TeammateTaskConnection, error)
	TasksDueSoon(ctx context.Context, workspaceID model.ID, teammateID model.ID) ([]*model.TeammateTask, error)
	Create(ctx context.Context, input model.CreateTeammateTaskInput) (*model.TeammateTask, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskInput) (*model.TeammateTask, error)
	Delete(ctx context.Context, input model.DeleteTeammateTaskInput) (*model.TeammateTask, error)
}

// NewTeammateTaskUsecase generates a repository.
func NewTeammateTaskUsecase(ttr repository.TeammateTask) TeammateTask {
	return &teammateTaskUsecase{teammateTaskRepository: ttr}
}

func (u *teammateTaskUsecase) Get(ctx context.Context, where *model.TeammateTaskWhereInput) (*model.TeammateTask, error) {
	return u.teammateTaskRepository.Get(ctx, where)
}

func (u *teammateTaskUsecase) List(ctx context.Context) ([]*model.TeammateTask, error) {
	return u.teammateTaskRepository.List(ctx)
}

func (u *teammateTaskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskWhereInput) (*model.TeammateTaskConnection, error) {
	return u.teammateTaskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *teammateTaskUsecase) TasksDueSoon(ctx context.Context, workspaceID model.ID, teammateID model.ID) ([]*model.TeammateTask, error) {
	return u.teammateTaskRepository.TasksDueSoon(ctx, workspaceID, teammateID)
}

func (u *teammateTaskUsecase) Create(ctx context.Context, input model.CreateTeammateTaskInput) (*model.TeammateTask, error) {
	return u.teammateTaskRepository.Create(ctx, input)
}

func (u *teammateTaskUsecase) Update(ctx context.Context, input model.UpdateTeammateTaskInput) (*model.TeammateTask, error) {
	return u.teammateTaskRepository.Update(ctx, input)
}

func (u *teammateTaskUsecase) Delete(ctx context.Context, input model.DeleteTeammateTaskInput) (*model.TeammateTask, error) {
	return u.teammateTaskRepository.Delete(ctx, input)
}
