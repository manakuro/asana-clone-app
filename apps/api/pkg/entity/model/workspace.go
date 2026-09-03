package model

import (
	"asana-clone-app/ent"
)

// Workspace is the model entity for the Workspace schema
type Workspace = ent.Workspace

// WorkspaceConnection is the connection containing edges to Workspace.
type WorkspaceConnection = ent.WorkspaceConnection

// CreateWorkspaceInput represents a mutation input for creating test users.
type CreateWorkspaceInput = ent.CreateWorkspaceInput

// WorkspaceWhereInput represents a where input for filtering Workspace queries.
type WorkspaceWhereInput = ent.WorkspaceWhereInput

// UpdateWorkspaceInput represents a mutation input for updating test users.
type UpdateWorkspaceInput = ent.UpdateWorkspaceInput
