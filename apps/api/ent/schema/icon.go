package schema

import (
	"asana-clone-app/ent/annotation"
	"asana-clone-app/ent/mixin"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

// Icon holds the schema definition for the Test entity.
type Icon struct {
	ent.Schema
}

// IconMixin defines Fields
type IconMixin struct {
	entMixin.Schema
}

// Fields of the Icon.
func (IconMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.String("icon").
			NotEmpty().
			MaxLen(255),
	}
}

// Edges of the Icon.
func (Icon) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(projectIconsRef, ProjectIcon.Type).
			Annotations(
				entgql.MapsTo(projectIconsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_icon_id"},
				),
			),
	}
}

// Mixin of the Icon.
func (Icon) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().Icon.Prefix),
		IconMixin{},
		mixin.NewDatetime(),
	}
}
