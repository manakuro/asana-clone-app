package model

import (
	"asana-clone-app/ent"
	"time"
)

// TeammateTaskSection is the model entity for the TeammateTaskSection schema.
type TeammateTaskSection = ent.TeammateTaskSection

// TeammateTaskSectionConnection is the connection containing edges to TeammateTaskSection.
type TeammateTaskSectionConnection = ent.TeammateTaskSectionConnection

// CreateTeammateTaskSectionInput represents a mutation input.
type CreateTeammateTaskSectionInput = ent.CreateTeammateTaskSectionInput

// TeammateTaskSectionWhereInput represents a where input.
type TeammateTaskSectionWhereInput = ent.TeammateTaskSectionWhereInput

// UpdateTeammateTaskSectionInput represents a mutation input.
type UpdateTeammateTaskSectionInput = ent.UpdateTeammateTaskSectionInput

// DeleteTeammateTaskSectionInput represents a mutation input.
type DeleteTeammateTaskSectionInput struct {
	ID          ID
	WorkspaceID ID
	RequestID   string
}

// DeleteTeammateTaskSectionAndKeepTasksInput represents a mutation input.
type DeleteTeammateTaskSectionAndKeepTasksInput struct {
	ID          ID
	WorkspaceID ID
	RequestID   string
}

// DeleteTeammateTaskSectionAndKeepTasksPayload represents a mutation payload.
type DeleteTeammateTaskSectionAndKeepTasksPayload struct {
	TeammateTaskSection     *TeammateTaskSection
	KeptTeammateTaskSection *TeammateTaskSection
	TeammateTaskIDs         []ID
}

// DeleteTeammateTaskSectionAndDeleteTasksInput represents a mutation input.
type DeleteTeammateTaskSectionAndDeleteTasksInput struct {
	ID          ID
	WorkspaceID ID
	RequestID   string
}

// DeleteTeammateTaskSectionAndDeleteTasksPayload represents a mutation payload.
type DeleteTeammateTaskSectionAndDeleteTasksPayload struct {
	TeammateTaskSection *TeammateTaskSection
	TeammateTaskIDs     []ID
	TaskIDs             []ID
}

// UndeleteTeammateTaskSectionAndKeepTasksInput represents a mutation input.
type UndeleteTeammateTaskSectionAndKeepTasksInput struct {
	Name                string
	Assigned            bool
	CreatedAt           *time.Time
	UpdatedAt           *time.Time
	TeammateID          ID
	KeptTeammateTaskIDs []ID
	WorkspaceID         ID
	RequestID           string
}

// UndeleteTeammateTaskSectionAndKeepTasksPayload represents a mutation payload.
type UndeleteTeammateTaskSectionAndKeepTasksPayload struct {
	TeammateTaskSection *TeammateTaskSection
	TeammateTaskIDs     []ID
}

// UndeleteTeammateTaskSectionAndDeleteTasksInput represents a mutation input.
type UndeleteTeammateTaskSectionAndDeleteTasksInput struct {
	Name                   string
	Assigned               bool
	CreatedAt              *time.Time
	UpdatedAt              *time.Time
	TeammateID             ID
	WorkspaceID            ID
	DeletedTeammateTaskIDs []ID
	DeletedTaskIDs         []ID
	RequestID              string
}

// UndeleteTeammateTaskSectionAndDeleteTasksPayload represents a mutation payload.
type UndeleteTeammateTaskSectionAndDeleteTasksPayload struct {
	TeammateTaskSection *TeammateTaskSection
	TeammateTasks       []*TeammateTask
}
