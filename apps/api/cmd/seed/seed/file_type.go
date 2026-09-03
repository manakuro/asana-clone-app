package seed

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/filetype"
	"context"
	"log"
)

var fileTypeSeed = struct {
	image ent.CreateFileTypeInput
	pdf   ent.CreateFileTypeInput
	text  ent.CreateFileTypeInput
}{
	image: ent.CreateFileTypeInput{Name: "Image", TypeCode: filetype.TypeCodeImage},
	pdf:   ent.CreateFileTypeInput{Name: "PDF", TypeCode: filetype.TypeCodePDF},
	text:  ent.CreateFileTypeInput{Name: "Text", TypeCode: filetype.TypeCodeText},
}

// FileType generates file type data.
func FileType(ctx context.Context, client *ent.Client) {
	_, err := client.FileType.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("FileType failed to delete data: %v", err)
	}

	inputs := []ent.CreateFileTypeInput{
		fileTypeSeed.image,
		fileTypeSeed.pdf,
		fileTypeSeed.text,
	}
	bulk := make([]*ent.FileTypeCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.FileType.Create().SetInput(t)
	}
	if _, err = client.FileType.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("FileType failed to seed data: %v", err)
	}
}
