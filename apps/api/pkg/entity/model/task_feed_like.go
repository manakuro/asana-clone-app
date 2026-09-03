package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// TaskFeedLike is the model entity for the TaskFeedLike schema.
type TaskFeedLike = ent.TaskFeedLike

// TaskFeedLikeConnection is the connection containing edges to TaskFeedLike.
type TaskFeedLikeConnection = ent.TaskFeedLikeConnection

// CreateTaskFeedLikeInput represents a mutation input.
type CreateTaskFeedLikeInput = ent.CreateTaskFeedLikeInput

// TaskFeedLikeWhereInput represents a where input.
type TaskFeedLikeWhereInput = ent.TaskFeedLikeWhereInput

// UpdateTaskFeedLikeInput represents a mutation input.
type UpdateTaskFeedLikeInput = ent.UpdateTaskFeedLikeInput

// DeleteTaskFeedLikeInput represents a mutation input.
type DeleteTaskFeedLikeInput struct {
	ID          ulid.ID
	RequestID   string
	WorkspaceID ulid.ID
}
