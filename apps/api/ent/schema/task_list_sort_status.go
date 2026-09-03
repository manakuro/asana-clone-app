package schema

import (
	"asana-clone-app/ent/annotation"
	"asana-clone-app/ent/mixin"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

// TaskListSortStatus holds the schema definition for the Test entity.
type TaskListSortStatus struct {
	ent.Schema
}

// TaskListSortStatusMixin defines Fields
type TaskListSortStatusMixin struct {
	entMixin.Schema
}

// Fields of the TaskListSortStatus.
func (TaskListSortStatusMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.Enum("status_code").
			NamedValues(
				"None", "NONE",
				"DueDate", "DUE_DATE",
				"Likes", "LIKES",
				"Alphabetical", "ALPHABETICAL",
				"Project", "PROJECT",
				"Assignee", "ASSIGNEE",
				"CreationTime", "CREATION_TIME",
				"Priority", "PRIORITY",
			).Annotations(
			entgql.Type("TaskListSortStatusCode"),
		),
	}
}

// Edges of the TaskListSortStatus.
func (TaskListSortStatus) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(teammateTaskListStatusesRef, TeammateTaskListStatus.Type).
			Annotations(
				entgql.MapsTo(teammateTaskListStatusesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_task_list_status_id"},
				),
			),
		edge.To(projectTaskListStatusesRef, ProjectTaskListStatus.Type).
			Annotations(
				entgql.MapsTo(projectTaskListStatusesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_task_list_status_id"},
				),
			),
	}
}

// Mixin of the TaskListSortStatus.
func (TaskListSortStatus) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskListSortStatus.Prefix),
		TaskListSortStatusMixin{},
		mixin.NewDatetime(),
	}
}
