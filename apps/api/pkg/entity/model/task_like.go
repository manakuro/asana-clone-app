package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// TaskLike is the model entity for the TaskLike schema.
type TaskLike = ent.TaskLike

// TaskLikeConnection is the connection containing edges to TaskLike.
type TaskLikeConnection = ent.TaskLikeConnection

// CreateTaskLikeInput represents a mutation input.
type CreateTaskLikeInput = ent.CreateTaskLikeInput

// TaskLikeWhereInput represents a where input.
type TaskLikeWhereInput = ent.TaskLikeWhereInput

// UpdateTaskLikeInput represents a mutation input.
type UpdateTaskLikeInput = ent.UpdateTaskLikeInput

// DeleteTaskLikeInput represents a mutation input.
type DeleteTaskLikeInput struct {
	ID          ulid.ID
	RequestID   string
	WorkspaceID ulid.ID
}
