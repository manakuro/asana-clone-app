package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ArchivedWorkspaceActivityTask is interface of repository
type ArchivedWorkspaceActivityTask interface {
	Get(ctx context.Context, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTask, error)
	List(ctx context.Context) ([]*model.ArchivedWorkspaceActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityTaskWhereInput) (*model.ArchivedWorkspaceActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error)
	Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error)
}
