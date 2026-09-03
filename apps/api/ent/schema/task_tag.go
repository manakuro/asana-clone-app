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

const taskTagsRef string = "taskTags"

// TaskTag holds the schema definition for the Test entity.
type TaskTag struct {
	ent.Schema
}

// TaskTagMixin defines Fields
type TaskTagMixin struct {
	entMixin.Schema
}

// Fields of the TaskTag.
func (TaskTagMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("tag_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the TaskTag.
func (TaskTag) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(taskTagsRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("tag", Tag.Type).
			Ref(taskTagsRef).
			Field("tag_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "tag_id"},
				),
			),
	}
}

// Annotations of the TaskTag.
func (TaskTag) Annotations() []schema.Annotation {
	return []schema.Annotation{
		schema.Annotation(
			annotation.MutationInput{
				Create: []annotation.MutationInputField{
					{
						Key:  "WorkspaceID",
						Type: "ulid.ID",
					},
				},
				Update: []annotation.MutationInputField{
					{
						Key:  "WorkspaceID",
						Type: "ulid.ID",
					},
				},
			},
		),
	}
}

// Mixin of the TaskTag.
func (TaskTag) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskTag.Prefix),
		TaskTagMixin{},
		mixin.NewDatetime(),
	}
}
