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

const projectIconsRef string = "projectIcons"

// ProjectIcon holds the schema definition for the Test entity.
type ProjectIcon struct {
	ent.Schema
}

// ProjectIconMixin defines Fields
type ProjectIconMixin struct {
	entMixin.Schema
}

// Fields of the ProjectIcon.
func (ProjectIconMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("icon_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ProjectIcon.
func (ProjectIcon) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(projectsRef, Project.Type).
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("icon", Icon.Type).
			Ref(projectIconsRef).
			Field("icon_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "icon_id"},
				),
			),
	}
}

// Mixin of the ProjectIcon.
func (ProjectIcon) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ProjectIcon.Prefix),
		ProjectIconMixin{},
		mixin.NewDatetime(),
	}
}
