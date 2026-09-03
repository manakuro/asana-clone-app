package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// TeammateTaskColumn is the model entity for the TeammateTaskColumn schema
type TeammateTaskColumn = ent.TeammateTaskColumn

// TeammateTaskColumnConnection is the connection containing edges to TeammateTaskColumn.
type TeammateTaskColumnConnection = ent.TeammateTaskColumnConnection

// CreateTeammateTaskColumnInput represents a mutation input.
type CreateTeammateTaskColumnInput = ent.CreateTeammateTaskColumnInput

// TeammateTaskColumnWhereInput represents a where input for.
type TeammateTaskColumnWhereInput = ent.TeammateTaskColumnWhereInput

// UpdateTeammateTaskColumnInput represents a mutation input.
type UpdateTeammateTaskColumnInput = ent.UpdateTeammateTaskColumnInput

// UpdateTeammateTaskColumnOrderInput represents a mutation input.
type UpdateTeammateTaskColumnOrderInput struct {
	IDs []ulid.ID
}
