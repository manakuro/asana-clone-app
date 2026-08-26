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

const archivedTaskActivitiesRef string = "archivedTaskActivities"

// ArchivedTaskActivity holds the schema definition for the Test entity.
type ArchivedTaskActivity struct {
	ent.Schema
}

// ArchivedTaskActivityMixin defines Fields
type ArchivedTaskActivityMixin struct {
	entMixin.Schema
}

// Fields of the ArchivedTaskActivity.
func (ArchivedTaskActivityMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("activity_type_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.String("workspace_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ArchivedTaskActivity.
func (ArchivedTaskActivity) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("teammate", Teammate.Type).
			Ref(archivedTaskActivitiesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
		edge.From("activityType", ActivityType.Type).
			Ref(archivedTaskActivitiesRef).
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
			Ref(archivedTaskActivitiesRef).
			Field("workspace_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.To(archivedTaskActivityTasksRef, ArchivedTaskActivityTask.Type).
			Annotations(
				entgql.MapsTo(archivedTaskActivityTasksRef),
				schema.Annotation(
					annotation.Edge{FieldName: "archived_activity_task_id"},
				),
			),
	}
}

// Mixin of the ArchivedTaskActivity.
func (ArchivedTaskActivity) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ArchivedTaskActivity.Prefix),
		ArchivedTaskActivityMixin{},
		mixin.NewDatetime(),
	}
}
