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

const projectTasksRef string = "projectTasks"

// ProjectTask holds the schema definition for the Test entity.
type ProjectTask struct {
	ent.Schema
}

// ProjectTaskMixin defines Fields
type ProjectTaskMixin struct {
	entMixin.Schema
}

// Fields of the ProjectTask.
func (ProjectTaskMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("project_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("project_task_section_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the ProjectTask.
func (ProjectTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref(projectTasksRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("task", Task.Type).
			Ref(projectTasksRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("projectTaskSection", ProjectTaskSection.Type).
			Ref(projectTasksRef).
			Field("project_task_section_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("projectTaskSection"),
				schema.Annotation(
					annotation.Edge{FieldName: "project_task_section_id"},
				),
			),
	}
}

// Annotations of the ProjectTask.
func (ProjectTask) Annotations() []schema.Annotation {
	return []schema.Annotation{
		schema.Annotation(
			annotation.MutationInput{
				Create: []annotation.MutationInputField{
					{
						Key:  "CreatedBy",
						Type: "ulid.ID",
					},
					{
						Key:  "WorkspaceID",
						Type: "ulid.ID",
					},
					{
						Key:  "TaskParentID",
						Type: "*ulid.ID",
					},
				},
				Update: []annotation.MutationInputField{
					{
						Key:  "WorkspaceID",
						Type: "ulid.ID",
					},
				},
			},
		),
	}
}

// Mixin of the ProjectTask.
func (ProjectTask) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ProjectTask.Prefix),
		ProjectTaskMixin{},
		mixin.NewDatetime(),
	}
}
