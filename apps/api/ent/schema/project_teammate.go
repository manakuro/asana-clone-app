package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const projectTeammatesRef string = "projectTeammates"

// ProjectTeammate holds the schema definition for the Test entity.
type ProjectTeammate struct {
	ent.Schema
}

// ProjectTeammateMixin defines Fields
type ProjectTeammateMixin struct {
	entMixin.Schema
}

// Fields of the ProjectTeammate.
func (ProjectTeammateMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("project_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
		field.String("role").
			MaxLen(255),
		field.Bool("is_owner"),
	}
}

// Edges of the ProjectTeammate.
func (ProjectTeammate) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref(projectTeammatesRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(projectTeammatesRef).
			Field("teammate_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "teammate_id"},
				),
			),
	}
}

// Annotations of the ProjectTeammate.
func (ProjectTeammate) Annotations() []schema.Annotation {
	return []schema.Annotation{
		schema.Annotation(
			annotation.MutationInput{
				Create: []annotation.MutationInputField{
					{
						Key:  "WorkspaceID",
						Type: "ulid.ID",
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

// Mixin of the ProjectTeammate.
func (ProjectTeammate) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().ProjectTeammate.Prefix),
		ProjectTeammateMixin{},
		mixin.NewDatetime(),
	}
}
