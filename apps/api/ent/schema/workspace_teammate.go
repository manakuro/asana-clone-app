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

const workspaceTeammatesRef string = "workspaceTeammates"

// WorkspaceTeammate holds the schema definition for the Test entity.
type WorkspaceTeammate struct {
	ent.Schema
}

// WorkspaceTeammateMixin defines Fields
type WorkspaceTeammateMixin struct {
	entMixin.Schema
}

// Fields of the WorkspaceTeammate.
func (WorkspaceTeammateMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.String("role").
			MaxLen(255),
		field.Bool("is_owner"),
	}
}

// Edges of the WorkspaceTeammate.
func (WorkspaceTeammate) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("workspace", Workspace.Type).
			Ref(workspaceTeammatesRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(workspaceTeammatesRef).
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

// Mixin of the WorkspaceTeammate.
func (WorkspaceTeammate) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().WorkspaceTeammate.Prefix),
		WorkspaceTeammateMixin{},
		mixin.NewDatetime(),
	}
}
