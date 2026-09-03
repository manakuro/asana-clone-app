package model

import (
	"asana-clone-app/ent/schema/ulid"
)

// Mention is the model entity for the Teammate schema.
type Mention struct {
	ID        ulid.ID `json:"id,omitempty"`
	ProjectID ulid.ID `json:"projectId,omitempty"`
	Type      int     `json:"type,omitempty"`
	Text      string  `json:"text,omitempty"`
	Title     string  `json:"title,omitempty"`
	Subtitle  string  `json:"subtitle,omitempty"`
	Href      string  `json:"href,omitempty"`
	Image     string  `json:"image,omitempty"`
	Completed bool    `json:"completed,omitempty"`
}

// MentionWhereInput represents a where input for filtering queries.
type MentionWhereInput struct {
	WorkspaceID ulid.ID `json:"workspaceId,omitempty"`
	Query       string  `json:"query,omitempty"`
	Limit       *int    `json:"limit,omitempty"`
}
