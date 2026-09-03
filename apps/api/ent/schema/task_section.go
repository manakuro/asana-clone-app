package schema

import (
	"asana-clone-app/ent/mixin"
	"asana-clone-app/pkg/const/globalid"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	entMixin "entgo.io/ent/schema/mixin"
)

// TaskSection holds the schema definition for the Test entity.
type TaskSection struct {
	ent.Schema
}

// TaskSectionMixin defines Fields
type TaskSectionMixin struct {
	entMixin.Schema
}

// Fields of the TaskSection.
func (TaskSectionMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			MaxLen(255),
	}
}

// Edges of the TaskSection.
func (TaskSection) Edges() []ent.Edge {
	return nil
}

// Mixin of the TaskSection.
func (TaskSection) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TaskSection.Prefix),
		TaskSectionMixin{},
		mixin.NewDatetime(),
	}
}
