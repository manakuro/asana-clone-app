package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// FavoriteWorkspace is the model entity for the FavoriteWorkspace schema
type FavoriteWorkspace = ent.FavoriteWorkspace

// FavoriteWorkspaceConnection is the connection containing edges to FavoriteWorkspace.
type FavoriteWorkspaceConnection = ent.FavoriteWorkspaceConnection

// CreateFavoriteWorkspaceInput represents a mutation input for creating favorite workspace.
type CreateFavoriteWorkspaceInput = ent.CreateFavoriteWorkspaceInput

// FavoriteWorkspaceWhereInput represents a where input for filtering FavoriteWorkspace queries.
type FavoriteWorkspaceWhereInput = ent.FavoriteWorkspaceWhereInput

// UpdateFavoriteWorkspaceInput represents a mutation input for updating favorite workspace.
type UpdateFavoriteWorkspaceInput = ent.UpdateFavoriteWorkspaceInput

// DeleteFavoriteWorkspaceInput represents a mutation input for updating favorite workspace.
type DeleteFavoriteWorkspaceInput struct {
	WorkspaceID ulid.ID
	TeammateID  ulid.ID
	RequestID   string
}
