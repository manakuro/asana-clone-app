package schema

import (
	"project-management-demo-backend/ent/annotation"
	"project-management-demo-backend/ent/mixin"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/pkg/const/globalid"

	"entgo.io/contrib/entgql"

	"entgo.io/ent/schema/index"

	"entgo.io/ent/dialect"

	"entgo.io/ent/schema"

	"entgo.io/ent/schema/edge"
	entMixin "entgo.io/ent/schema/mixin"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// TestTodo holds the schema definition for the TestTodo entity.
type TestTodo struct {
	ent.Schema
}

// TestTodoMixin defines Fields
type TestTodoMixin struct {
	entMixin.Schema
}

// Fields of the TestTodo.
func (TestTodoMixin) Fields() []ent.Field {
	return []ent.Field{
		field.String("test_user_id").
			GoType(ulid.ID("")).
			Optional(),
		field.String("created_by").
			GoType(ulid.ID("")).
			Annotations(
				annotation.WhereInput{Type: "ID"},
			),
		field.String("parent_todo_id").
			GoType(ulid.ID("")).
			Optional(),
		field.String("name").Default(""),
		field.Enum("status").
			NamedValues(
				"InProgress", "IN_PROGRESS",
				"Completed", "COMPLETED",
			).
			Default("IN_PROGRESS").
			Annotations(
				entgql.Type("TestTodoStatus"),
			),
		field.Int("priority").Default(0),
		field.Time("due_date").
			Nillable().
			Optional().
			SchemaType(map[string]string{
				dialect.MySQL: "datetime",
			}),
	}
}

// Indexes of the TestTodo.
func (TestTodo) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("created_by"),
	}
}

// Edges of the TestTodo.
func (TestTodo) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("testUser", TestUser.Type).
			Ref("testTodos").
			Unique().
			Field("test_user_id").
			Annotations(
				entgql.Bind(),
				schema.Annotation(
					annotation.Edge{FieldName: "test_user_id"},
				),
			),
		edge.To("children", TestTodo.Type).
			From("parent").
			Field("parent_todo_id").
			Unique().
			Annotations(
				entgql.Bind(),
				schema.Annotation(
					annotation.Edge{FieldName: "parent_todo_id"},
				),
			),
	}
}

// Mixin of the TestTodo.
func (TestTodo) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.NewUlid(globalid.New().TestTodo.Prefix),
		TestTodoMixin{},
		mixin.NewDatetime(),
	}
}
