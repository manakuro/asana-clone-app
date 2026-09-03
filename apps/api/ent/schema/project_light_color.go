package schema

import (
	"asana-clone-app/ent/annotation"
	"asana-clone-app/ent/mixin"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const projectLightColorsRef string = "projectLightColors"

// ProjectLightColor holds the schema definition for the Test entity.
type ProjectLightColor struct {
	ent.Schema
}

// ProjectLightColorMixin defines Fields
type ProjectLightColorMixin struct {
	entMixin.Schema
}

// Fields of the ProjectLightColor.
func (ProjectLightColorMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("color_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ProjectLightColor.
func (ProjectLightColor) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(projectsRef, Project.Type).
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("color", Color.Type).
			Ref(projectLightColorsRef).
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

// Mixin of the ProjectLightColor.
func (ProjectLightColor) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ProjectLightColor.Prefix),
		ProjectLightColorMixin{},
		mixin.NewDatetime(),
	}
}
