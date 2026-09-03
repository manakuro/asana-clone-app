package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// ProjectTask is the model entity for the ProjectTask schema.
type ProjectTask = ent.ProjectTask

// ProjectTaskConnection is the connection containing edges to ProjectTask.
type ProjectTaskConnection = ent.ProjectTaskConnection

// CreateProjectTaskInput represents a mutation input.
type CreateProjectTaskInput = ent.CreateProjectTaskInput

// ProjectTaskWhereInput represents a where input.
type ProjectTaskWhereInput = ent.ProjectTaskWhereInput

// UpdateProjectTaskInput represents a mutation input.
type UpdateProjectTaskInput = ent.UpdateProjectTaskInput

// DeleteProjectTaskInput represents a mutation input.
type DeleteProjectTaskInput struct {
	ID          ulid.ID
	WorkspaceID ID
	RequestID   string
}

// CreateProjectTaskByTaskIDInput represents a mutation input.
type CreateProjectTaskByTaskIDInput struct {
	ProjectID   ID
	TaskID      ID
	WorkspaceID ID
	RequestID   string
}
