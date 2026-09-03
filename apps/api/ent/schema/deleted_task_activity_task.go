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

const deletedTaskActivityTasksRef string = "deletedTaskActivityTasks"

// DeletedTaskActivityTask holds the schema definition for the Test entity.
type DeletedTaskActivityTask struct {
	ent.Schema
}

// DeletedTaskActivityTaskMixin defines Fields
type DeletedTaskActivityTaskMixin struct {
	entMixin.Schema
}

// Fields of the DeletedTaskActivityTask.
func (DeletedTaskActivityTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("task_activity_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("task_activity_task_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.Time("task_activity_task_created_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
		field.Time("task_activity_task_updated_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
	}
}

// Edges of the DeletedTaskActivityTask.
func (DeletedTaskActivityTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(deletedTaskActivityTasksRef).
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

// Mixin of the DeletedTaskActivityTask.
func (DeletedTaskActivityTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().DeletedTaskActivityTask.Prefix),
		DeletedTaskActivityTaskMixin{},
		mixin.NewDatetime(),
	}
}
