package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// WorkspaceActivity is interface of repository
type WorkspaceActivity interface {
	Get(ctx context.Context, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivity, error)
	List(ctx context.Context) ([]*model.WorkspaceActivity, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityWhereInput) (*model.WorkspaceActivityConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceActivityInput) (*model.WorkspaceActivity, error)
	Update(ctx context.Context, input model.UpdateWorkspaceActivityInput) (*model.WorkspaceActivity, error)
}
