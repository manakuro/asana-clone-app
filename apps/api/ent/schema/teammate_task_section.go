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

const teammateTaskSectionsRef string = "teammateTaskSections"

// TeammateTaskSection holds the schema definition for the Test entity.
type TeammateTaskSection struct {
	ent.Schema
}

// TeammateTaskSectionMixin defines Fields
type TeammateTaskSectionMixin struct {
	entMixin.Schema
}

// Fields of the TeammateTaskSection.
func (TeammateTaskSectionMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("name").
			MaxLen(255),
		field.Bool("assigned"),
	}
}

// Edges of the TeammateTaskSection.
func (TeammateTaskSection) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("teammate", Teammate.Type).
			Ref(teammateTaskSectionsRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.From("workspace", Workspace.Type).
			Ref(teammateTaskSectionsRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.To(teammateTasksRef, TeammateTask.Type).
			Annotations(
				entgql.MapsTo(teammateTasksRef),
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_task_id"},
				),
			),
	}
}

// Mixin of the TeammateTaskSection.
func (TeammateTaskSection) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TeammateTaskSection.Prefix),
		TeammateTaskSectionMixin{},
		mixin.NewDatetime(),
	}
}
