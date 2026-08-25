package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

// Color holds the schema definition for the Test entity.
type Color struct {
	ent.Schema
}

// ColorMixin defines Fields
type ColorMixin struct {
	entMixin.Schema
}

// Fields of the Color.
func (ColorMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.String("color").
			NotEmpty().
			MaxLen(255),
		field.String("hex").
			NotEmpty().
			MaxLen(255),
	}
}

// Edges of the Color.
func (Color) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(projectBaseColorsRef, ProjectBaseColor.Type).
			Annotations(
				entgql.MapsTo(projectBaseColorsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_base_color_id"},
				),
			),
		edge.To(projectLightColorsRef, ProjectLightColor.Type).
			Annotations(
				entgql.MapsTo(projectLightColorsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_light_color_id"},
				),
			),
		edge.To(taskPrioritiesRef, TaskPriority.Type).
			Annotations(
				entgql.MapsTo(taskPrioritiesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "task_priority_id"},
				),
			),
		edge.To(tagsRef, Tag.Type).Annotations(
			entgql.Bind(),
			schema.Annotation(
				annotation.Edge{FieldName: "tag_id"},
			),
		),
	}
}

// Mixin of the Color.
func (Color) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().Color.Prefix),
		ColorMixin{},
		mixin.NewDatetime(),
	}
}
