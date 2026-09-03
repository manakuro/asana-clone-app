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

const deletedTeammateTasksRef string = "deletedTeammateTasks"

// DeletedTeammateTask holds the schema definition for the Test entity.
type DeletedTeammateTask struct {
	ent.Schema
}

// DeletedTeammateTaskMixin defines Fields
type DeletedTeammateTaskMixin struct {
	entMixin.Schema
}

// Fields of the DeletedTeammateTask.
func (DeletedTeammateTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("teammate_task_section_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("teammate_task_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.Time("teammate_task_created_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
		field.Time("teammate_task_updated_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
	}
}

// Edges of the DeletedTeammateTask.
func (DeletedTeammateTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("teammate", Teammate.Type).
			Ref(deletedTeammateTasksRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.From("task", Task.Type).
			Ref(deletedTeammateTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("workspace", Workspace.Type).
			Ref(deletedTeammateTasksRef).
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

// Mixin of the DeletedTeammateTask.
func (DeletedTeammateTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().DeletedTeammateTask.Prefix),
		DeletedTeammateTaskMixin{},
		mixin.NewDatetime(),
	}
}
