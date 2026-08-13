package annotation

import "encoding/json"

// WhereInput is used to map ent.Field to GraphQL type in ./graph/ent.graphql.
//
//	field.String("created_by").
//		GoType(ulid.ID("")).
//		Annotations(
//			annotation.WhereInput{Type: "ID"},
//		),
type WhereInput struct {
	Type string
}

// Name implements the Annotation interface.
func (i WhereInput) Name() string {
	return "WhereInput"
}

// Decode unmarshal annotation.
func (i *WhereInput) Decode(annotation interface{}) error {
	buf, err := json.Marshal(annotation)
	if err != nil {
		return err
	}
	return json.Unmarshal(buf, i)
}
