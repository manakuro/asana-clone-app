package model

import (
	"asana-clone-app/ent"
	"time"
)

// ProjectTaskSection is the model entity for the ProjectTaskSection schema.
type ProjectTaskSection = ent.ProjectTaskSection

// ProjectTaskSectionConnection is the connection containing edges to ProjectTaskSection.
type ProjectTaskSectionConnection = ent.ProjectTaskSectionConnection

// CreateProjectTaskSectionInput represents a mutation input.
type CreateProjectTaskSectionInput = ent.CreateProjectTaskSectionInput

// ProjectTaskSectionWhereInput represents a where input.
type ProjectTaskSectionWhereInput = ent.ProjectTaskSectionWhereInput

// UpdateProjectTaskSectionInput represents a mutation input.
type UpdateProjectTaskSectionInput = ent.UpdateProjectTaskSectionInput

// DeleteProjectTaskSectionInput represents a mutation input.
type DeleteProjectTaskSectionInput struct {
	ID          ID
	WorkspaceID ID
	RequestID   string
}

// DeleteProjectTaskSectionAndKeepTasksInput represents a mutation input.
type DeleteProjectTaskSectionAndKeepTasksInput struct {
	ID          ID
	WorkspaceID ID
	RequestID   string
}

// DeleteProjectTaskSectionAndKeepTasksPayload represents a mutation payload.
type DeleteProjectTaskSectionAndKeepTasksPayload struct {
	ProjectTaskSection     *ProjectTaskSection
	KeptProjectTaskSection *ProjectTaskSection
	ProjectTaskIDs         []ID
}

// DeleteProjectTaskSectionAndDeleteTasksInput represents a mutation input.
type DeleteProjectTaskSectionAndDeleteTasksInput struct {
	ID          ID
	WorkspaceID ID
	RequestID   string
}

// DeleteProjectTaskSectionAndDeleteTasksPayload represents a mutation payload.
type DeleteProjectTaskSectionAndDeleteTasksPayload struct {
	ProjectTaskSection *ProjectTaskSection
	ProjectTaskIDs     []ID
	TaskIDs            []ID
}

// UndeleteProjectTaskSectionAndKeepTasksInput represents a mutation input.
type UndeleteProjectTaskSectionAndKeepTasksInput struct {
	Name               string
	CreatedAt          *time.Time
	UpdatedAt          *time.Time
	ProjectID          ID
	KeptProjectTaskIDs []ID
	WorkspaceID        ID
	RequestID          string
}

// UndeleteProjectTaskSectionAndKeepTasksPayload represents a mutation payload.
type UndeleteProjectTaskSectionAndKeepTasksPayload struct {
	ProjectTaskSection *ProjectTaskSection
	ProjectTaskIDs     []ID
}

// UndeleteProjectTaskSectionAndDeleteTasksInput represents a mutation input.
type UndeleteProjectTaskSectionAndDeleteTasksInput struct {
	Name                  string
	CreatedAt             *time.Time
	UpdatedAt             *time.Time
	ProjectID             ID
	WorkspaceID           ID
	DeletedProjectTaskIDs []ID
	DeletedTaskIDs        []ID
	RequestID             string
}

// UndeleteProjectTaskSectionAndDeleteTasksPayload represents a mutation payload.
type UndeleteProjectTaskSectionAndDeleteTasksPayload struct {
	ProjectTaskSection *ProjectTaskSection
	ProjectTasks       []*ProjectTask
}
