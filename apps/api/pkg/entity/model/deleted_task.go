package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// DeletedTask is the model entity for the DeletedTask schema.
type DeletedTask = ent.DeletedTask

// DeletedTaskConnection is the connection containing edges to DeletedTask.
type DeletedTaskConnection = ent.DeletedTaskConnection

// CreateDeletedTaskInput represents a mutation input.
type CreateDeletedTaskInput = ent.CreateDeletedTaskInput

// DeletedTaskWhereInput represents a where input.
type DeletedTaskWhereInput = ent.DeletedTaskWhereInput

// UpdateDeletedTaskInput represents a mutation input.
type UpdateDeletedTaskInput = ent.UpdateDeletedTaskInput

// DeleteDeletedTaskInput represents a mutation input.
type DeleteDeletedTaskInput struct {
	ID        ulid.ID
	RequestID string
}

// UndeleteDeletedTaskInput represents a mutation input.
type UndeleteDeletedTaskInput struct {
	TaskID    ulid.ID
	RequestID string
}
