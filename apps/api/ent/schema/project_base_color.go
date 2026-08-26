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

const projectBaseColorsRef string = "projectBaseColors"

// ProjectBaseColor holds the schema definition for the Test entity.
type ProjectBaseColor struct {
	ent.Schema
}

// ProjectBaseColorMixin defines Fields
type ProjectBaseColorMixin struct {
	entMixin.Schema
}

// Fields of the ProjectBaseColor.
func (ProjectBaseColorMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("color_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ProjectBaseColor.
func (ProjectBaseColor) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(projectsRef, Project.Type).
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("color", Color.Type).
			Ref(projectBaseColorsRef).
			Field("color_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "color_id"},
				),
			),
	}
}

// Mixin of the ProjectBaseColor.
func (ProjectBaseColor) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ProjectBaseColor.Prefix),
		ProjectBaseColorMixin{},
		mixin.NewDatetime(),
	}
}
