package model

import (
	"asana-clone-app/ent"
)

// Tag is the model entity for the Tag schema
type Tag = ent.Tag

// TagConnection is the connection containing edges to Tag.
type TagConnection = ent.TagConnection

// CreateTagInput represents a mutation input for creating test users.
type CreateTagInput = ent.CreateTagInput

// TagWhereInput represents a where input for filtering Tag queries.
type TagWhereInput = ent.TagWhereInput

// UpdateTagInput represents a mutation input for updating test users.
type UpdateTagInput = ent.UpdateTagInput
