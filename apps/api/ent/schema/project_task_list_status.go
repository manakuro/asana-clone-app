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

const projectTaskListStatusesRef string = "projectTaskListStatuses"

// ProjectTaskListStatus holds the schema definition for the Test entity.
type ProjectTaskListStatus struct {
	ent.Schema
}

// ProjectTaskListStatusMixin defines Fields
type ProjectTaskListStatusMixin struct {
	entMixin.Schema
}

// Fields of the ProjectTaskListStatus.
func (ProjectTaskListStatusMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("project_id").
			GoType(ulid.ID("")),
		field.String("task_list_completed_status_id").
			GoType(ulid.ID("")),
		field.String("task_list_sort_status_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ProjectTaskListStatus.
func (ProjectTaskListStatus) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref(projectTaskListStatusesRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("taskListCompletedStatus", TaskListCompletedStatus.Type).
			Ref(projectTaskListStatusesRef).
			Field("task_list_completed_status_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("taskListCompletedStatus"),
				schema.Annotation(
					annotation.Edge{FieldName: "task_list_completed_status_id"},
				),
			),
		edge.From("taskListSortStatus", TaskListSortStatus.Type).
			Ref(projectTaskListStatusesRef).
			Field("task_list_sort_status_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("taskListSortStatus"),
				schema.Annotation(
					annotation.Edge{FieldName: "task_list_sort_status_id"},
				),
			),
	}
}

// Mixin of the ProjectTaskListStatus.
func (ProjectTaskListStatus) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ProjectTaskListStatus.Prefix),
		ProjectTaskListStatusMixin{},
		mixin.NewDatetime(),
	}
}
