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

const taskFeedLikesRef string = "taskFeedLikes"

// TaskFeedLike holds the schema definition for the Test entity.
type TaskFeedLike struct {
	ent.Schema
}

// TaskFeedLikeMixin defines Fields
type TaskFeedLikeMixin struct {
	entMixin.Schema
}

// Fields of the TaskFeedLike.
func (TaskFeedLikeMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.String("task_feed_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the TaskFeedLike.
func (TaskFeedLike) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(taskFeedLikesRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(taskFeedLikesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.From("feed", TaskFeed.Type).
			Ref(taskFeedLikesRef).
			Field("task_feed_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_feed_id"},
				),
			),
	}
}

// Annotations of the ProjectTask.
func (TaskFeedLike) Annotations() []schema.Annotation {
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

// Mixin of the TaskFeedLike.
func (TaskFeedLike) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskFeedLike.Prefix),
		TaskFeedLikeMixin{},
		mixin.NewDatetime(),
	}
}
