package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Workspace is interface of repository
type Workspace interface {
	Get(ctx context.Context, where *model.WorkspaceWhereInput) (*model.Workspace, error)
	List(ctx context.Context) ([]*model.Workspace, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceWhereInput) (*model.WorkspaceConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceInput) (*model.Workspace, error)
	Update(ctx context.Context, input model.UpdateWorkspaceInput) (*model.Workspace, error)
}
