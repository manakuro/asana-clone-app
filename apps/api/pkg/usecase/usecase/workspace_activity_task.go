package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type workspaceActivityTaskUsecase struct {
	workspaceActivityTaskRepository repository.WorkspaceActivityTask
}

// WorkspaceActivityTask is an interface of test user
type WorkspaceActivityTask interface {
	Get(ctx context.Context, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTask, error)
	List(ctx context.Context) ([]*model.WorkspaceActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error)
	Update(ctx context.Context, input model.UpdateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error)
}

// NewWorkspaceActivityTaskUsecase generates test user repository
func NewWorkspaceActivityTaskUsecase(r repository.WorkspaceActivityTask) WorkspaceActivityTask {
	return &workspaceActivityTaskUsecase{workspaceActivityTaskRepository: r}
}

func (u *workspaceActivityTaskUsecase) Get(ctx context.Context, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTask, error) {
	return u.workspaceActivityTaskRepository.Get(ctx, where)
}

func (u *workspaceActivityTaskUsecase) List(ctx context.Context) ([]*model.WorkspaceActivityTask, error) {
	return u.workspaceActivityTaskRepository.List(ctx)
}

func (u *workspaceActivityTaskUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTaskConnection, error) {
	return u.workspaceActivityTaskRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *workspaceActivityTaskUsecase) Create(ctx context.Context, input model.CreateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error) {
	return u.workspaceActivityTaskRepository.Create(ctx, input)
}

func (u *workspaceActivityTaskUsecase) Update(ctx context.Context, input model.UpdateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error) {
	return u.workspaceActivityTaskRepository.Update(ctx, input)
}
