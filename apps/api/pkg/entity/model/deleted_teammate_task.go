package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// DeletedTeammateTask is the model entity for the DeletedTeammateTask schema.
type DeletedTeammateTask = ent.DeletedTeammateTask

// DeletedTeammateTaskConnection is the connection containing edges to DeletedTeammateTask.
type DeletedTeammateTaskConnection = ent.DeletedTeammateTaskConnection

// CreateDeletedTeammateTaskInput represents a mutation input.
type CreateDeletedTeammateTaskInput = ent.CreateDeletedTeammateTaskInput

// DeletedTeammateTaskWhereInput represents a where input.
type DeletedTeammateTaskWhereInput = ent.DeletedTeammateTaskWhereInput

// UpdateDeletedTeammateTaskInput represents a mutation input.
type UpdateDeletedTeammateTaskInput = ent.UpdateDeletedTeammateTaskInput

// DeleteDeletedTeammateTaskInput represents a mutation input.
type DeleteDeletedTeammateTaskInput struct {
	ID          ulid.ID
	TaskID      ulid.ID
	TeammateID  ulid.ID
	WorkspaceID ulid.ID
	RequestID   string
}
