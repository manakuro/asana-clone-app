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

const taskFilesRef string = "taskFiles"

// TaskFile holds the schema definition for the Test entity.
type TaskFile struct {
	ent.Schema
}

// TaskFileMixin defines Fields
type TaskFileMixin struct {
	entMixin.Schema
}

// Fields of the TaskFile.
func (TaskFileMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("project_id").
			GoType(ulid.ID("")),
		field.String("task_id").
			GoType(ulid.ID("")),
		field.String("task_feed_id").
			GoType(ulid.ID("")),
		field.String("file_type_id").
			GoType(ulid.ID("")),
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.String("src").
			NotEmpty().
			MaxLen(255),
		field.Bool("attached").
			Default(false),
	}
}

// Edges of the TaskFile.
func (TaskFile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref(taskFilesRef).
			Field("project_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "project_id"},
				),
			),
		edge.From("task", Task.Type).
			Ref(taskFilesRef).
			Field("task_id").
			Unique().
			Required().
			Annotations(
				schema.Annotation(
					annotation.Edge{FieldName: "task_id"},
				),
			),
		edge.From("taskFeed", TaskFeed.Type).
			Ref(taskFilesRef).
			Field("task_feed_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("taskFeed"),
				schema.Annotation(
					annotation.Edge{FieldName: "task_feed_id"},
				),
			),
		edge.From("fileType", FileType.Type).
			Ref(taskFilesRef).
			Field("file_type_id").
			Unique().
			Required().
			Annotations(
				entgql.MapsTo("fileType"),
				schema.Annotation(
					annotation.Edge{FieldName: "file_type_id"},
				),
			),
	}
}

// Mixin of the TaskFile.
func (TaskFile) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskFile.Prefix),
		TaskFileMixin{},
		mixin.NewDatetime(),
	}
}
