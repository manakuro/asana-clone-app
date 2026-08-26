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

const archivedWorkspaceActivitiesRef string = "archivedWorkspaceActivities"

// ArchivedWorkspaceActivity holds the schema definition for the Test entity.
type ArchivedWorkspaceActivity struct {
	ent.Schema
}

// ArchivedWorkspaceActivityMixin defines Fields
type ArchivedWorkspaceActivityMixin struct {
	entMixin.Schema
}

// Fields of the ArchivedWorkspaceActivity.
func (ArchivedWorkspaceActivityMixin) Fields() []ent.Field {
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

// Edges of the ArchivedWorkspaceActivity.
func (ArchivedWorkspaceActivity) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("activityType", ActivityType.Type).
			Ref(archivedWorkspaceActivitiesRef).
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
			Ref(archivedWorkspaceActivitiesRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.From("project", Project.Type).
			Ref(archivedWorkspaceActivitiesRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(archivedWorkspaceActivitiesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.To(archivedWorkspaceActivityTasksRef, ArchivedWorkspaceActivityTask.Type).
			Annotations(
				entgql.MapsTo(archivedWorkspaceActivityTasksRef),
				schema.Annotation(
					annotation.Edge{FieldName: "archived_workspace_activity_task_id"},
				),
			),
	}
}

// Mixin of the ArchivedWorkspaceActivity.
func (ArchivedWorkspaceActivity) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ArchivedWorkspaceActivity.Prefix),
		ArchivedWorkspaceActivityMixin{},
		mixin.NewDatetime(),
	}
}
