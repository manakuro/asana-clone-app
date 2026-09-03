package model

import (
	"asana-clone-app/ent/schema/ulid"
	"time"
)

// Me is the model entity for the Teammate schema.
type Me struct {
	ID        ulid.ID   `json:"id,omitempty"`
	Name      string    `json:"name,omitempty"`
	Image     string    `json:"image,omitempty"`
	Email     string    `json:"email,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
}

// UpdateMeInput represents a mutation input for updating teammate.
type UpdateMeInput struct {
	ID    ulid.ID `json:"id"`
	Name  *string `json:"name"`
	Image *string `json:"image"`
	Email *string `json:"email"`
}
