package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

var teammateSeed = struct {
	manato ent.CreateTeammateInput
	dan    ent.CreateTeammateInput
	kent   ent.CreateTeammateInput
}{
	manato: ent.CreateTeammateInput{
		Name:  "Manato Kuroda",
		Image: "/images/cat_img.png",
		Email: "manato.kuroda@example.com",
	},
	dan: ent.CreateTeammateInput{
		Name:  "Dan Abrahmov",
		Image: "/images/dan.jpg",
		Email: "dan.abrahmov@example.com",
	},
	kent: ent.CreateTeammateInput{
		Name:  "Kent Dodds",
		Image: "/images/kent.jpg",
		Email: "kent.dodds@example.com",
	},
}

// Teammate generates teammate data.
func Teammate(ctx context.Context, client *ent.Client) {
	_, err := client.Teammate.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("Teammate failed to delete data: %v", err)
	}

	inputs := []ent.CreateTeammateInput{
		teammateSeed.manato,
		teammateSeed.dan,
		teammateSeed.kent,
	}
	bulk := make([]*ent.TeammateCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.Teammate.Create().SetInput(t)
	}
	if _, err = client.Teammate.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("Teammate failed to seed data: %v", err)
	}
}
