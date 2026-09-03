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

// TaskListCompletedStatus holds the schema definition for the Test entity.
type TaskListCompletedStatus struct {
	ent.Schema
}

// TaskListCompletedStatusMixin defines Fields
type TaskListCompletedStatusMixin struct {
	entMixin.Schema
}

// Fields of the TaskListCompletedStatus.make
func (TaskListCompletedStatusMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.Enum("status_code").
			NamedValues(
				"Incomplete", "INCOMPLETE",
				"Completed", "COMPLETED",
				"CompletedToday", "COMPLETED_TODAY",
				"CompletedYesterday", "COMPLETED_YESTERDAY",
				"Completed1Week", "COMPLETED_1_WEEK",
				"Completed2Weeks", "COMPLETED_2_WEEKS",
				"Completed3Weeks", "COMPLETED_3_WEEKS",
				"All", "ALL",
			).Annotations(
			entgql.Type("TaskListCompletedStatusCode"),
		),
	}
}

// Edges of the TaskListCompletedStatus.
func (TaskListCompletedStatus) Edges() []ent.Edge {
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

// Mixin of the TaskListCompletedStatus.
func (TaskListCompletedStatus) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskListCompletedStatus.Prefix),
		TaskListCompletedStatusMixin{},
		mixin.NewDatetime(),
	}
}
