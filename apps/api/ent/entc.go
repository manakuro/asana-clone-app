//go:build ignore
// +build ignore

package main

import (
	"asana-clone-app/ent/annotation"
	"log"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
)

func main() {
	ex, err := entgql.NewExtension(
		entgql.WithWhereFilters(true),
		entgql.WithConfigPath("../gqlgen.yml"),
		entgql.WithSchemaPath("../graph/schema/ent.graphql"),
		entgql.WithMapScalarFunc(func(f *gen.Field, op gen.Op) string {
			var whereInput annotation.WhereInput
			if wi, ok := f.Annotations[whereInput.Name()]; ok {
				whereInput.Decode(wi)
				return whereInput.Type
			}
			return ""
		}),
	)
	if err != nil {
		log.Fatalf("Error: failed creating entgql extension: %v", err)
	}
	opts := []entc.Option{
		entc.Extensions(ex),
		entc.TemplateDir("./template"),
	}

	if err := entc.Generate("./schema", &gen.Config{
		Features: []gen.Feature{
			gen.FeatureUpsert,
		},
	}, opts...); err != nil {
		log.Fatalf("Error: failed running ent codegen: %v", err)
	}
}
