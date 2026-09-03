package schema

import (
	"asana-clone-app/ent/annotation"
	"asana-clone-app/ent/mixin"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/ent/dialect"

	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const deletedWorkspaceActivityTasksRef string = "deletedWorkspaceActivityTasks"

// DeletedWorkspaceActivityTask holds the schema definition for the Test entity.
type DeletedWorkspaceActivityTask struct {
	ent.Schema
}

// DeletedWorkspaceActivityTaskMixin defines Fields
type DeletedWorkspaceActivityTaskMixin struct {
	entMixin.Schema
}

// Fields of the DeletedWorkspaceActivityTask.
func (DeletedWorkspaceActivityTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("workspace_activity_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("workspace_activity_task_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.Time("workspace_activity_task_created_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
		field.Time("workspace_activity_task_updated_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
	}
}

// Edges of the DeletedWorkspaceActivityTask.
func (DeletedWorkspaceActivityTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(deletedWorkspaceActivityTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
	}
}

// Mixin of the DeletedWorkspaceActivityTask.
func (DeletedWorkspaceActivityTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().DeletedWorkspaceActivityTask.Prefix),
		DeletedWorkspaceActivityTaskMixin{},
		mixin.NewDatetime(),
	}
}
