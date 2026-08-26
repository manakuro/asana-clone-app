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

const deletedTasksRef string = "deletedTasksRef"

// DeletedTask holds the schema definition for the Test entity.
type DeletedTask struct {
	ent.Schema
}

// DeletedTaskMixin defines Fields
type DeletedTaskMixin struct {
	entMixin.Schema
}

// Fields of the DeletedTask.
func (DeletedTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("workspace_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the DeletedTask.
func (DeletedTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(deletedTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("workspace", Workspace.Type).
			Ref(deletedTasksRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
	}
}

// Mixin of the DeletedTask.
func (DeletedTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().DeletedTask.Prefix),
		DeletedTaskMixin{},
		mixin.NewDatetime(),
	}
}
