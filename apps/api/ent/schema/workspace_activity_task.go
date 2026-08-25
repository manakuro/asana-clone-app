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

const workspaceActivityTasksRef string = "workspaceActivityTasks"

// WorkspaceActivityTask holds the schema definition for the Test entity.
type WorkspaceActivityTask struct {
	ent.Schema
}

// WorkspaceActivityTaskMixin defines Fields
type WorkspaceActivityTaskMixin struct {
	entMixin.Schema
}

// Fields of the WorkspaceActivityTask.
func (WorkspaceActivityTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("workspace_activity_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the WorkspaceActivityTask.
func (WorkspaceActivityTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(workspaceActivityTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("workspaceActivity", WorkspaceActivity.Type).
			Ref(workspaceActivityTasksRef).
			Field("workspace_activity_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("workspaceActivity"),
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_activity_id"},
				),
			),
	}
}

// Mixin of the WorkspaceActivityTask.
func (WorkspaceActivityTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().WorkspaceActivityTask.Prefix),
		WorkspaceActivityTaskMixin{},
		mixin.NewDatetime(),
	}
}
