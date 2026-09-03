package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type teammateTaskSectionUsecase struct {
	teammateTaskSectionRepository repository.TeammateTaskSection
}

// TeammateTaskSection is an interface of usecase.
type TeammateTaskSection interface {
	Get(ctx context.Context, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSection, error)
	List(ctx context.Context) ([]*model.TeammateTaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSectionConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	Delete(ctx context.Context, input model.DeleteTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	DeleteAndKeepTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndKeepTasksInput) (*model.DeleteTeammateTaskSectionAndKeepTasksPayload, error)
	DeleteAndDeleteTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndDeleteTasksInput) (*model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error)
	UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndKeepTasksInput) (*model.UndeleteTeammateTaskSectionAndKeepTasksPayload, error)
	UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndDeleteTasksInput) (*model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error)
}

// NewTeammateTaskSectionUsecase generates a repository.
func NewTeammateTaskSectionUsecase(r repository.TeammateTaskSection) TeammateTaskSection {
	return &teammateTaskSectionUsecase{teammateTaskSectionRepository: r}
}

func (u *teammateTaskSectionUsecase) Get(ctx context.Context, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSection, error) {
	return u.teammateTaskSectionRepository.Get(ctx, where)
}

func (u *teammateTaskSectionUsecase) List(ctx context.Context) ([]*model.TeammateTaskSection, error) {
	return u.teammateTaskSectionRepository.List(ctx)
}

func (u *teammateTaskSectionUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSectionConnection, error) {
	return u.teammateTaskSectionRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *teammateTaskSectionUsecase) Create(ctx context.Context, input model.CreateTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	return u.teammateTaskSectionRepository.Create(ctx, input)
}

func (u *teammateTaskSectionUsecase) Update(ctx context.Context, input model.UpdateTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	return u.teammateTaskSectionRepository.Update(ctx, input)
}

func (u *teammateTaskSectionUsecase) Delete(ctx context.Context, input model.DeleteTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	return u.teammateTaskSectionRepository.Delete(ctx, input)
}

func (u *teammateTaskSectionUsecase) DeleteAndKeepTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndKeepTasksInput) (*model.DeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	return u.teammateTaskSectionRepository.DeleteAndKeepTasks(ctx, input)
}

func (u *teammateTaskSectionUsecase) DeleteAndDeleteTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndDeleteTasksInput) (*model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	return u.teammateTaskSectionRepository.DeleteAndDeleteTasks(ctx, input)
}

func (u *teammateTaskSectionUsecase) UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndKeepTasksInput) (*model.UndeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	return u.teammateTaskSectionRepository.UndeleteAndKeepTasks(ctx, input)
}

func (u *teammateTaskSectionUsecase) UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndDeleteTasksInput) (*model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	return u.teammateTaskSectionRepository.UndeleteAndDeleteTasks(ctx, input)
}
