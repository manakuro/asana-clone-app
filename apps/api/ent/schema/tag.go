package schema

import (
	"asana-clone-app/ent/annotation"
	"asana-clone-app/ent/mixin"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const tagsRef string = "tags"

// Tag holds the schema definition for the Test entity.
type Tag struct {
	ent.Schema
}

// TagMixin defines Fields
type TagMixin struct {
	entMixin.Schema
}

// Fields of the Tag.
func (TagMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("color_id").
			GoType(ulid.ID("")),
		field.String("name").
			NotEmpty().
			MaxLen(255),
	}
}

// Edges of the Tag.
func (Tag) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("workspace", Workspace.Type).
			Ref(tagsRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.From("color", Color.Type).
			Ref(tagsRef).
			Field("color_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "color_id"},
				),
			),
		edge.To(taskTagsRef, TaskTag.Type).
			Annotations(
				entgql.MapsTo(taskTagsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "task_tag_id"},
				),
			),
	}
}

// Mixin of the Tag.
func (Tag) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().Tag.Prefix),
		TagMixin{},
		mixin.NewDatetime(),
	}
}
