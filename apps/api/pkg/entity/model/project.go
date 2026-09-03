package model

import (
	"asana-clone-app/ent"
)

// Project is the model entity for the Project schema
type Project = ent.Project

// ProjectConnection is the connection containing edges to Project.
type ProjectConnection = ent.ProjectConnection

// CreateProjectInput represents a mutation input for creating test users.
type CreateProjectInput = ent.CreateProjectInput

// ProjectWhereInput represents a where input for filtering Project queries.
type ProjectWhereInput = ent.ProjectWhereInput

// UpdateProjectInput represents a mutation input for updating test users.
type UpdateProjectInput = ent.UpdateProjectInput
