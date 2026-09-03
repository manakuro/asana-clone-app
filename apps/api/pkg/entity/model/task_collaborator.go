package model

import (
	"asana-clone-app/ent"
)

// TaskCollaborator is the model entity for the TaskCollaborator schema.
type TaskCollaborator = ent.TaskCollaborator

// TaskCollaboratorConnection is the connection containing edges to TaskCollaborator.
type TaskCollaboratorConnection = ent.TaskCollaboratorConnection

// CreateTaskCollaboratorInput represents a mutation input.
type CreateTaskCollaboratorInput = ent.CreateTaskCollaboratorInput

// TaskCollaboratorWhereInput represents a where input.
type TaskCollaboratorWhereInput = ent.TaskCollaboratorWhereInput

// UpdateTaskCollaboratorInput represents a mutation input.
type UpdateTaskCollaboratorInput = ent.UpdateTaskCollaboratorInput

// DeleteTaskCollaboratorInput represents a mutation input.
type DeleteTaskCollaboratorInput struct {
	ID          ID
	RequestID   string
	WorkspaceID ID
}
