package schema

import (
	"asana-clone-app/ent/annotation"
	"asana-clone-app/ent/mixin"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

const taskCollaboratorsRef string = "taskCollaborators"

// TaskCollaborator holds the schema definition for the Test entity.
type TaskCollaborator struct {
	ent.Schema
}

// TaskCollaboratorMixin defines Fields
type TaskCollaboratorMixin struct {
	entMixin.Schema
}

// Fields of the TaskCollaborator.
func (TaskCollaboratorMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("teammate_id").
			GoType(ulid.ID("")),
	}
}

// Edges of the TaskCollaborator.
func (TaskCollaborator) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Task.Type).
			Ref(taskCollaboratorsRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("teammate", Teammate.Type).
			Ref(taskCollaboratorsRef).
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

// Annotations of the TaskCollaborator.
func (TaskCollaborator) Annotations() []schema.Annotation {
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

// Mixin of the TaskCollaborator.
func (TaskCollaborator) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskCollaborator.Prefix),
		TaskCollaboratorMixin{},
		mixin.NewDatetime(),
	}
}
