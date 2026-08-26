package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

// FileType holds the schema definition for the Test entity.
type FileType struct {
	ent.Schema
}

// FileTypeMixin defines Fields
type FileTypeMixin struct {
	entMixin.Schema
}

// Fields of the FileType.
func (FileTypeMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			MaxLen(255),
		field.Enum("type_code").
			NamedValues(
				"Image", "IMAGE",
				"PDF", "PDF",
				"Text", "TEXT",
			).Annotations(
			entgql.Type("FileTypeCode"),
		),
	}
}

// Edges of the FileType.
func (FileType) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To(taskFilesRef, TaskFile.Type).
			Annotations(
				entgql.MapsTo(taskFilesRef),
				schema.Annotation(
					annotation.Edge{FieldName: "task_file_id"},
				),
			),
	}
}

// Mixin of the FileType.
func (FileType) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().FileType.Prefix),
		FileTypeMixin{},
		mixin.NewDatetime(),
	}
}
