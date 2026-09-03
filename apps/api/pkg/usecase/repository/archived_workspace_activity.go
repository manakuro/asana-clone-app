package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ArchivedWorkspaceActivity is interface of repository
type ArchivedWorkspaceActivity interface {
	Get(ctx context.Context, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivity, error)
	List(ctx context.Context) ([]*model.ArchivedWorkspaceActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedWorkspaceActivityWhereInput) (*model.ArchivedWorkspaceActivityConnection, error)
	Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error)
	Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error)
}
