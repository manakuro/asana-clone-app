package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
)

// FavoriteProject is the model entity for the FavoriteProject schema
type FavoriteProject = ent.FavoriteProject

// FavoriteProjectConnection is the connection containing edges to FavoriteProject.
type FavoriteProjectConnection = ent.FavoriteProjectConnection

// CreateFavoriteProjectInput represents a mutation input for creating favorite project.
type CreateFavoriteProjectInput = ent.CreateFavoriteProjectInput

// FavoriteProjectWhereInput represents a where input for filtering FavoriteProject queries.
type FavoriteProjectWhereInput = ent.FavoriteProjectWhereInput

// UpdateFavoriteProjectInput represents a mutation input for updating favorite project.
type UpdateFavoriteProjectInput = ent.UpdateFavoriteProjectInput

// DeleteFavoriteProjectInput represents a mutation input for updating favorite project.
type DeleteFavoriteProjectInput struct {
	ProjectID  ulid.ID
	TeammateID ulid.ID
	RequestID  string
}
