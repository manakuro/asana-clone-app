package model

import (
	"asana-clone-app/ent"
)

// Teammate is the model entity for the Teammate schema
type Teammate = ent.Teammate

// TeammateConnection is the connection containing edges to Teammate.
type TeammateConnection = ent.TeammateConnection

// CreateTeammateInput represents a mutation input for creating test users.
type CreateTeammateInput = ent.CreateTeammateInput

// TeammateWhereInput represents a where input for filtering Teammate queries.
type TeammateWhereInput = ent.TeammateWhereInput

// UpdateTeammateInput represents a mutation input for updating test users.
type UpdateTeammateInput = ent.UpdateTeammateInput
