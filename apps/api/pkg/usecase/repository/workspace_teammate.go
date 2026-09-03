package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// WorkspaceTeammate is interface of repository
type WorkspaceTeammate interface {
	Get(ctx context.Context, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammate, error)
	List(ctx context.Context) ([]*model.WorkspaceTeammate, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceTeammateWhereInput) (*model.WorkspaceTeammateConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error)
	Update(ctx context.Context, input model.UpdateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error)
}
