package annotation

// MutationInputField is a field of MutationInput.
type MutationInputField struct {
	Key  string
	Type string
}

// MutationInput is used to map ent.Field to GraphQL type in ./graph/ent.graphql.
//nolint:goimports
//func (ProjectTask) Annotations() []schema.Annotation {
//	return []schema.Annotation{
//		schema.Annotation(
//			annotation.MutationInput{
//				Input: []annotation.MutationInputField{
//					{
//						Key:  "CreatedBy",
//						Type: "ulid.ID",
//					},
//				},
//			},
//		),
//	}
//}
type MutationInput struct {
	Create  []MutationInputField
	Update  []MutationInputField
	SkipPtr bool
}

// Name implements the Annotation interface.
func (i MutationInput) Name() string {
	return "MutationInput"
}
