package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/ent/dialect"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const deletedProjectTasksRef string = "deletedProjectTasks"

// DeletedProjectTask holds the schema definition for the Test entity.
type DeletedProjectTask struct {
	ent.Schema
}

// DeletedProjectTaskMixin defines Fields
type DeletedProjectTaskMixin struct {
	entMixin.Schema
}

// Fields of the DeletedProjectTask.
func (DeletedProjectTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("project_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("project_task_section_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.String("project_task_id").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.Time("project_task_created_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
		field.Time("project_task_updated_at").
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
	}
}

// Edges of the DeletedProjectTask.
func (DeletedProjectTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref(deletedProjectTasksRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("task", Task.Type).
			Ref(deletedProjectTasksRef).
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

// Mixin of the DeletedProjectTask.
func (DeletedProjectTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().DeletedProjectTask.Prefix),
		DeletedProjectTaskMixin{},
		mixin.NewDatetime(),
	}
}
