package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const teammateTaskTabStatusesRef string = "teammateTaskTabStatuses"

// TeammateTaskTabStatus holds the schema definition for the Test entity.
type TeammateTaskTabStatus struct {
	ent.Schema
}

// TeammateTaskTabStatusMixin defines Fields
type TeammateTaskTabStatusMixin struct {
	entMixin.Schema
}

// Fields of the TeammateTaskTabStatus.
func (TeammateTaskTabStatusMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.Enum("status_code").
			NamedValues(
				"List", "LIST",
				"Board", "BOARD",
				"Calendar", "CALENDAR",
				"Files", "FILES",
			).
			Default("LIST").
			Annotations(
				entgql.Type("TeammateTaskTabStatusCode"),
			),
	}
}

// Edges of the TeammateTaskTabStatus.
func (TeammateTaskTabStatus) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("workspace", Workspace.Type).
			Ref(teammateTaskTabStatusesRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				entgql.Bind(),
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(teammateTaskTabStatusesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				entgql.Bind(),
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
	}
}

// Mixin of the TeammateTaskTabStatus.
func (TeammateTaskTabStatus) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TeammateTaskTabStatus.Prefix),
		TeammateTaskTabStatusMixin{},
		mixin.NewDatetime(),
	}
}
