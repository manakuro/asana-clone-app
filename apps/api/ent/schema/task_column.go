package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

// TaskColumn holds the schema definition for the Test entity.
type TaskColumn struct {
	ent.Schema
}

// TaskColumnMixin defines Fields
type TaskColumnMixin struct {
	entMixin.Schema
}

// Fields of the TaskColumn.
func (TaskColumnMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.Enum("type").
			NamedValues(
				"TaskName", "TASK_NAME",
				"Assignee", "ASSIGNEE",
				"DueDate", "DUE_DATE",
				"Project", "PROJECT",
				"Projects", "PROJECTS",
				"Priority", "PRIORITY",
				"Tags", "TAGS",
				"Custom", "CUSTOM",
			).Annotations(
			entgql.Type("TaskColumnType"),
		),
	}
}

// Edges of the TaskColumn.
func (TaskColumn) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(teammateTaskColumnsRef, TeammateTaskColumn.Type).
			Annotations(
				entgql.MapsTo(teammateTaskColumnsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_task_column_id"},
				),
			),

		edge.To(projectTaskColumnsRef, ProjectTaskColumn.Type).
			Annotations(
				entgql.MapsTo(projectTaskColumnsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_task_column_id"},
				),
			),
	}
}

// Mixin of the TaskColumn.
func (TaskColumn) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskColumn.Prefix),
		TaskColumnMixin{},
		mixin.NewDatetime(),
	}
}
