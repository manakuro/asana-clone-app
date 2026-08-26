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

const taskActivityTasksRef string = "taskActivityTasks"

// TaskActivityTask holds the schema definition for the Test entity.
type TaskActivityTask struct {
	ent.Schema
}

// TaskActivityTaskMixin defines Fields
type TaskActivityTaskMixin struct {
	entMixin.Schema
}

// Fields of the TaskActivityTask.
func (TaskActivityTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("task_activity_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the TaskActivityTask.
func (TaskActivityTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(taskActivityTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("taskActivity", TaskActivity.Type).
			Ref(taskActivityTasksRef).
			Field("task_activity_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("taskActivity"),
				schema.Annotation(
					annotation.Edge{FieldName: "task_activity_id"},
				),
			),
	}
}

// Mixin of the TaskActivityTask.
func (TaskActivityTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskActivityTask.Prefix),
		TaskActivityTaskMixin{},
		mixin.NewDatetime(),
	}
}
