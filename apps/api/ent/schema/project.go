package schema

import (
	"asana-clone-app/ent/annotation"
	"asana-clone-app/ent/mixin"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/dialect"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const projectsRef string = "projects"

// Project holds the schema definition for the Test entity.
type Project struct {
	ent.Schema
}

// ProjectMixin defines Fields
type ProjectMixin struct {
	entMixin.Schema
}

// Fields of the Project.
func (ProjectMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("workspace_id").
			GoType(ulid.ID("")),
		field.String("project_base_color_id").
			GoType(ulid.ID("")),
		field.String("project_light_color_id").
			GoType(ulid.ID("")),
		field.String("project_icon_id").
			GoType(ulid.ID("")),
		field.String("created_by").
			GoType(ulid.ID("")),
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.JSON("description", map[string]interface{}{}).
			Annotations(
				annotation.MutationInput{
					SkipPtr: true,
				},
			),
		field.String("description_title").
			MaxLen(255),
		field.Time("due_date").
			Nillable().
			Optional().
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
	}
}

// Edges of the Project.
func (Project) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("workspace", Workspace.Type).
			Ref(projectsRef).
			Unique().
			Field("workspace_id").
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_id"},
				),
			),
		edge.From("projectBaseColor", ProjectBaseColor.Type).
			Ref(projectsRef).
			Unique().
			Field("project_base_color_id").
			Required().
			Annotations(
				entgql.MapsTo("projectBaseColor"),
				schema.Annotation(
					annotation.Edge{FieldName: "project_base_color_id"},
				),
			),
		edge.From("projectLightColor", ProjectLightColor.Type).
			Ref(projectsRef).
			Unique().
			Field("project_light_color_id").
			Required().
			Annotations(
				entgql.MapsTo("projectLightColor"),
				schema.Annotation(
					annotation.Edge{FieldName: "project_light_color_id"},
				),
			),
		edge.From("projectIcon", ProjectIcon.Type).
			Ref(projectsRef).
			Unique().
			Field("project_icon_id").
			Required().
			Annotations(
				entgql.MapsTo("projectIcon"),
				schema.Annotation(
					annotation.Edge{FieldName: "project_icon_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(projectsRef).
			Unique().
			Field("created_by").
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "created_by"},
				),
			),
		edge.To(projectTeammatesRef, ProjectTeammate.Type).
			Annotations(
				entgql.MapsTo(projectTeammatesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_teammate_id"},
				),
			),
		edge.To(favoriteProjectsRef, FavoriteProject.Type).
			Annotations(
				entgql.MapsTo(favoriteProjectsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "favorite_project_id"},
				),
			),
		edge.To(projectTaskColumnsRef, ProjectTaskColumn.Type).
			Annotations(
				entgql.MapsTo(projectTaskColumnsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_task_column_id"},
				),
			),
		edge.To(projectTaskListStatusesRef, ProjectTaskListStatus.Type).
			Annotations(
				entgql.MapsTo(projectTaskListStatusesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_task_list_status_id"},
				),
			),
		edge.To(projectTaskSectionsRef, ProjectTaskSection.Type).
			Annotations(
				entgql.MapsTo(projectTaskSectionsRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_task_section_id"},
				),
			),
		edge.To(projectTasksRef, ProjectTask.Type).
			Annotations(
				entgql.MapsTo(projectTasksRef),
				schema.Annotation(
					annotation.Edge{FieldName: "project_task_id"},
				),
			),
		edge.To(taskFilesRef, TaskFile.Type).
			Annotations(
				entgql.MapsTo(taskFilesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "task_file_id"},
				),
			),
		edge.To(workspaceActivitiesRef, WorkspaceActivity.Type).
			Annotations(
				entgql.MapsTo(workspaceActivitiesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "workspace_activity_id"},
				),
			),
		edge.To(archivedWorkspaceActivitiesRef, ArchivedWorkspaceActivity.Type).
			Annotations(
				entgql.MapsTo(archivedWorkspaceActivitiesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "archived_workspace_activity_id"},
				),
			),
		edge.To(deletedProjectTasksRef, DeletedProjectTask.Type).
			Annotations(
				entgql.MapsTo(deletedProjectTasksRef),
				schema.Annotation(
					annotation.Edge{FieldName: "deleted_project_task_id"},
				),
			),
	}
}

// Mixin of the Project.
func (Project) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().Project.Prefix),
		ProjectMixin{},
		mixin.NewDatetime(),
	}
}
