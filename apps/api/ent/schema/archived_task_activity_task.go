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

const archivedTaskActivityTasksRef string = "archivedTaskActivityTasks"

// ArchivedTaskActivityTask holds the schema definition for the Test entity.
type ArchivedTaskActivityTask struct {
	ent.Schema
}

// ArchivedTaskActivityTaskMixin defines Fields
type ArchivedTaskActivityTaskMixin struct {
	entMixin.Schema
}

// Fields of the ArchivedTaskActivityTask.
func (ArchivedTaskActivityTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("archived_task_activity_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ArchivedTaskActivityTask.
func (ArchivedTaskActivityTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(archivedTaskActivityTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("archivedTaskActivity", ArchivedTaskActivity.Type).
			Ref(archivedTaskActivityTasksRef).
			Field("archived_task_activity_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("archivedTaskActivity"),
				schema.Annotation(
					annotation.Edge{FieldName: "archived_task_activity_id"},
				),
			),
	}
}

// Mixin of the ArchivedTaskActivityTask.
func (ArchivedTaskActivityTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ArchivedTaskActivityTask.Prefix),
		ArchivedTaskActivityTaskMixin{},
		mixin.NewDatetime(),
	}
}
