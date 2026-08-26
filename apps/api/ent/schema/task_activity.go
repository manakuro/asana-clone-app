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

const taskActivitiesRef string = "taskActivities"

// TaskActivity holds the schema definition for the Test entity.
type TaskActivity struct {
	ent.Schema
}

// TaskActivityMixin defines Fields
type TaskActivityMixin struct {
	entMixin.Schema
}

// Fields of the TaskActivity.
func (TaskActivityMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("activity_type_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.String("workspace_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the TaskActivity.
func (TaskActivity) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("teammate", Teammate.Type).
			Ref(taskActivitiesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.From("activityType", ActivityType.Type).
			Ref(taskActivitiesRef).
			Field("activity_type_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("activityType"),
				schema.Annotation(
					annotation.Edge{FieldName: "activity_type_id"},
				),
			),
		edge.From("workspace", Workspace.Type).
			Ref(taskActivitiesRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.To(taskActivityTasksRef, TaskActivityTask.Type).
			Annotations(
				entgql.MapsTo(taskActivityTasksRef),
				schema.Annotation(
					annotation.Edge{FieldName: "task_activity_task_id"},
				),
			),
	}
}

// Mixin of the TaskActivity.
func (TaskActivity) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskActivity.Prefix),
		TaskActivityMixin{},
		mixin.NewDatetime(),
	}
}
