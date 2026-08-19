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

const taskPrioritiesRef string = "taskPriorities"

// TaskPriority holds the schema definition for the Test entity.
type TaskPriority struct {
	ent.Schema
}

// TaskPriorityMixin defines Fields
type TaskPriorityMixin struct {
	entMixin.Schema
}

// Fields of the TaskPriority.
func (TaskPriorityMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("color_id").
			GoType(ulid.ID("")),
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.Enum("priority_type").
			NamedValues(
				"Low", "LOW",
				"Medium", "MEDIUM",
				"High", "HIGH",
			).Annotations(
			entgql.Type("TaskPriorityType"),
		),
	}
}

// Edges of the TaskPriority.
func (TaskPriority) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("color", Color.Type).
			Ref(taskPrioritiesRef).
			Field("color_id").
			Unique().
			Required().
			Annotations(
				entgql.Bind(),
				schema.Annotation(
					annotation.Edge{FieldName: "color_id"},
				),
			),
		edge.To(tasksRef, Task.Type).
			Annotations(
				entgql.Bind(),
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
	}
}

// Mixin of the TaskPriority.
func (TaskPriority) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskPriority.Prefix),
		TaskPriorityMixin{},
		mixin.NewDatetime(),
	}
}
