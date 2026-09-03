package model

import (
	"asana-clone-app/ent"
)

// ProjectTeammate is the model entity for the ProjectTeammate schema
type ProjectTeammate = ent.ProjectTeammate

// ProjectTeammateConnection is the connection containing edges to ProjectTeammate.
type ProjectTeammateConnection = ent.ProjectTeammateConnection

// CreateProjectTeammateInput represents a mutation input for creating project teammate.
type CreateProjectTeammateInput = ent.CreateProjectTeammateInput

// ProjectTeammateWhereInput represents a where input for filtering ProjectTeammate queries.
type ProjectTeammateWhereInput = ent.ProjectTeammateWhereInput

// UpdateProjectTeammateInput represents a mutation input for updating project teammate.
type UpdateProjectTeammateInput = ent.UpdateProjectTeammateInput

// UpdateProjectTeammateOwnerInput represents a mutation input for updating owner.
type UpdateProjectTeammateOwnerInput struct {
	TeammateID  ID
	ProjectID   ID
	WorkspaceID ID
	RequestID   string
}
