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

const favoriteProjectsRef string = "favoriteProjects"

// FavoriteProject holds the schema definition for the Test entity.
type FavoriteProject struct {
	ent.Schema
}

// FavoriteProjectMixin defines Fields
type FavoriteProjectMixin struct {
	entMixin.Schema
}

// Fields of the FavoriteProject.
func (FavoriteProjectMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("project_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the FavoriteProject.
func (FavoriteProject) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref(favoriteProjectsRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(favoriteProjectsRef).
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

// Mixin of the FavoriteProject.
func (FavoriteProject) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().FavoriteProject.Prefix),
		FavoriteProjectMixin{},
		mixin.NewDatetime(),
	}
}
