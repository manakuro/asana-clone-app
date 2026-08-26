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

const archivedWorkspaceActivityTasksRef string = "archivedWorkspaceActivityTasks"

// ArchivedWorkspaceActivityTask holds the schema definition for the Test entity.
type ArchivedWorkspaceActivityTask struct {
	ent.Schema
}

// ArchivedWorkspaceActivityTaskMixin defines Fields
type ArchivedWorkspaceActivityTaskMixin struct {
	entMixin.Schema
}

// Fields of the ArchivedWorkspaceActivityTask.
func (ArchivedWorkspaceActivityTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("archived_workspace_activity_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ArchivedWorkspaceActivityTask.
func (ArchivedWorkspaceActivityTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(archivedWorkspaceActivityTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("archivedWorkspaceActivity", ArchivedWorkspaceActivity.Type).
			Ref(archivedWorkspaceActivityTasksRef).
			Field("archived_workspace_activity_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("archivedWorkspaceActivity"),
				schema.Annotation(
					annotation.Edge{FieldName: "archived_workspace_activity_id"},
				),
			),
	}
}

// Mixin of the ArchivedWorkspaceActivityTask.
func (ArchivedWorkspaceActivityTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ArchivedWorkspaceActivityTask.Prefix),
		ArchivedWorkspaceActivityTaskMixin{},
		mixin.NewDatetime(),
	}
}
