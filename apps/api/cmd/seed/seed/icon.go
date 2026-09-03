package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

var iconSeed = struct {
	play         ent.CreateIconInput
	home         ent.CreateIconInput
	moon         ent.CreateIconInput
	sun          ent.CreateIconInput
	menu         ent.CreateIconInput
	codeAlt      ent.CreateIconInput
	rocket       ent.CreateIconInput
	idCard       ent.CreateIconInput
	trashAlt     ent.CreateIconInput
	task         ent.CreateIconInput
	bell         ent.CreateIconInput
	notification ent.CreateIconInput
	barChart     ent.CreateIconInput
	bookOpen     ent.CreateIconInput
	layerPlus    ent.CreateIconInput
	mobile       ent.CreateIconInput
	movie        ent.CreateIconInput
	shapePolygon ent.CreateIconInput
	spreadsheet  ent.CreateIconInput
	layout       ent.CreateIconInput
}{
	play:         ent.CreateIconInput{Name: "play", Icon: "play"},
	home:         ent.CreateIconInput{Name: "home", Icon: "home"},
	moon:         ent.CreateIconInput{Name: "moon", Icon: "moon"},
	sun:          ent.CreateIconInput{Name: "sun", Icon: "sun"},
	menu:         ent.CreateIconInput{Name: "menu", Icon: "menu"},
	codeAlt:      ent.CreateIconInput{Name: "codeAlt", Icon: "codeAlt"},
	rocket:       ent.CreateIconInput{Name: "rocket", Icon: "rocket"},
	idCard:       ent.CreateIconInput{Name: "idCard", Icon: "idCard"},
	trashAlt:     ent.CreateIconInput{Name: "trashAlt", Icon: "trashAlt"},
	task:         ent.CreateIconInput{Name: "task", Icon: "task"},
	bell:         ent.CreateIconInput{Name: "bell", Icon: "bell"},
	notification: ent.CreateIconInput{Name: "notification", Icon: "notification"},
	barChart:     ent.CreateIconInput{Name: "barChart", Icon: "barChart"},
	bookOpen:     ent.CreateIconInput{Name: "bookOpen", Icon: "bookOpen"},
	layerPlus:    ent.CreateIconInput{Name: "layerPlus", Icon: "layerPlus"},
	mobile:       ent.CreateIconInput{Name: "mobile", Icon: "mobile"},
	movie:        ent.CreateIconInput{Name: "movie", Icon: "movie"},
	shapePolygon: ent.CreateIconInput{Name: "shapePolygon", Icon: "shapePolygon"},
	spreadsheet:  ent.CreateIconInput{Name: "spreadsheet", Icon: "spreadsheet"},
	layout:       ent.CreateIconInput{Name: "layout", Icon: "layout"},
}

// Icon generates icon data.
func Icon(ctx context.Context, client *ent.Client) {
	_, err := client.Icon.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("Icon failed to delete data: %v", err)
	}

	inputs := []ent.CreateIconInput{
		iconSeed.play,
		iconSeed.home,
		iconSeed.moon,
		iconSeed.sun,
		iconSeed.menu,
		iconSeed.codeAlt,
		iconSeed.rocket,
		iconSeed.idCard,
		iconSeed.trashAlt,
		iconSeed.task,
		iconSeed.bell,
		iconSeed.notification,
		iconSeed.barChart,
		iconSeed.bookOpen,
		iconSeed.layerPlus,
		iconSeed.mobile,
		iconSeed.movie,
		iconSeed.shapePolygon,
		iconSeed.spreadsheet,
		iconSeed.layout,
	}
	bulk := make([]*ent.IconCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.Icon.Create().SetInput(t)
	}
	if _, err = client.Icon.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("Icon failed to seed data: %v", err)
	}
}
