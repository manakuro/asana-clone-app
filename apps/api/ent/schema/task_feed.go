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

const taskFeedsRef string = "taskFeeds"

// TaskFeed holds the schema definition for the Test entity.
type TaskFeed struct {
	ent.Schema
}

// TaskFeedMixin defines Fields
type TaskFeedMixin struct {
	entMixin.Schema
}

// Fields of the TaskFeed.
func (TaskFeedMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.JSON("description", map[string]interface{}{}).
			Annotations(
				annotation.MutationInput{
					SkipPtr: true,
				},
			),
		field.Bool("is_first").
			Default(false),
		field.Bool("is_pinned").
			Default(false),
	}
}

// Edges of the TaskFeed.
func (TaskFeed) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(taskFeedsRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(taskFeedsRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.To(taskFeedLikesRef, TaskFeedLike.Type).
			Annotations(
				entgql.MapsTo(taskFeedLikesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "task_feed_like_id"},
				),
			),
		edge.To(taskFilesRef, TaskFile.Type).
			Annotations(
				entgql.MapsTo(taskFilesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "task_file_id"},
				),
			),
	}
}

// Annotations of the ProjectTask.
func (TaskFeed) Annotations() []schema.Annotation {
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

// Mixin of the TaskFeed.
func (TaskFeed) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskFeed.Prefix),
		TaskFeedMixin{},
		mixin.NewDatetime(),
	}
}
