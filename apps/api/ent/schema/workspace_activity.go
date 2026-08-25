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

const workspaceActivitiesRef string = "workspaceActivities"

// WorkspaceActivity holds the schema definition for the Test entity.
type WorkspaceActivity struct {
	ent.Schema
}

// WorkspaceActivityMixin defines Fields
type WorkspaceActivityMixin struct {
	entMixin.Schema
}

// Fields of the WorkspaceActivity.
func (WorkspaceActivityMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("activity_type_id").
			GoType(ulid.ID("")),
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("project_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the WorkspaceActivity.
func (WorkspaceActivity) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("activityType", ActivityType.Type).
			Ref(workspaceActivitiesRef).
			Field("activity_type_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("activityType"),
				schema.Annotation(
					annotation.Edge{FieldName: "activity_type_id"},
				),
			),
		edge.From("workspace", Workspace.Type).
			Ref(workspaceActivitiesRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.From("project", Project.Type).
			Ref(workspaceActivitiesRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(workspaceActivitiesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.To(workspaceActivityTasksRef, WorkspaceActivityTask.Type).
			Annotations(
				entgql.MapsTo(workspaceActivityTasksRef),
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_activity_task_id"},
				),
			),
	}
}

// Mixin of the WorkspaceActivity.
func (WorkspaceActivity) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().WorkspaceActivity.Prefix),
		WorkspaceActivityMixin{},
		mixin.NewDatetime(),
	}
}
