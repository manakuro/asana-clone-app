package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const favoriteWorkspacesRef string = "favoriteWorkspaces"

// FavoriteWorkspace holds the schema definition for the Test entity.
type FavoriteWorkspace struct {
	ent.Schema
}

// FavoriteWorkspaceMixin defines Fields
type FavoriteWorkspaceMixin struct {
	entMixin.Schema
}

// Fields of the FavoriteWorkspace.
func (FavoriteWorkspaceMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the FavoriteWorkspace.
func (FavoriteWorkspace) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("workspace", Workspace.Type).
			Ref(favoriteWorkspacesRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(favoriteWorkspacesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
	}
}

// Mixin of the FavoriteWorkspace.
func (FavoriteWorkspace) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().FavoriteWorkspace.Prefix),
		FavoriteWorkspaceMixin{},
		mixin.NewDatetime(),
	}
}
