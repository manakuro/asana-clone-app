package model

import (
	"asana-clone-app/ent"
)

// TaskFeed is the model entity for the TaskFeed schema.
type TaskFeed = ent.TaskFeed

// TaskFeedConnection is the connection containing edges to TaskFeed.
type TaskFeedConnection = ent.TaskFeedConnection

// CreateTaskFeedInput represents a mutation input.
type CreateTaskFeedInput = ent.CreateTaskFeedInput

// TaskFeedWhereInput represents a where input.
type TaskFeedWhereInput = ent.TaskFeedWhereInput

// UpdateTaskFeedInput represents a mutation input.
type UpdateTaskFeedInput = ent.UpdateTaskFeedInput

// DeleteTaskFeedInput represents a mutation input.
type DeleteTaskFeedInput struct {
	ID          ID
	RequestID   string
	WorkspaceID ID
}

// DeleteTaskFeedInputPayload represents a mutation payload.
type DeleteTaskFeedInputPayload struct {
	TaskFeed      *TaskFeed
	TaskFeedLikes []*TaskFeedLike
	TaskFiles     []*TaskFile
}

// UndeleteTaskFeedInput represents a mutation input.
type UndeleteTaskFeedInput struct {
	TaskFeed      *UndeleteTaskFeedTaskFeedInput
	TaskFeedLikes []*UndeleteTaskFeedTaskFeedLikeInput
	TaskFiles     []*UndeleteTaskFeedTaskFileInput
	RequestID     string
	WorkspaceID   ID
}

// UndeleteTaskFeedTaskFeedInput represents a mutation input.
type UndeleteTaskFeedTaskFeedInput = TaskFeed

// UndeleteTaskFeedTaskFeedLikeInput represents a mutation input.
type UndeleteTaskFeedTaskFeedLikeInput = TaskFeedLike

// UndeleteTaskFeedTaskFileInput represents a mutation input.
type UndeleteTaskFeedTaskFileInput = TaskFile

// UndeleteTaskFeedInputPayload represents a mutation payload.
type UndeleteTaskFeedInputPayload struct {
	TaskFeed      *TaskFeed
	TaskFeedLikes []*TaskFeedLike
	TaskFiles     []*TaskFile
}
