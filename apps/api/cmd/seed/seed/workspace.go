package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"asana-clone-app/ent/teammate"
	"context"
	"log"
)

// Workspace generates workspace data.
func Workspace(ctx context.Context, client *ent.Client) {
	_, err := client.Workspace.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("Workspace failed to delete data: %v", err)
	}

	tm, err := client.Teammate.Query().Where(teammate.EmailEQ("manato.kuroda@example.com")).Only(ctx)
	if err != nil {
		log.Fatalf("workspace: failed get teammate: %v", err)
	}

	b := []byte(`{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "A Workspace is a collection of people that collaborate on projects and tasks. Workspaces can be used by any group of people and do not require a common company email domain."
        }
      ]
    }
  ]
}`)

	inputs := []ent.CreateWorkspaceInput{
		{
			Name:        "My Workspace",
			Description: seedutil.ParseDescription(b),
			CreatedBy:   tm.ID,
		},
		{
			Name:        "My Workspace 2",
			Description: seedutil.ParseDescription(b),
			CreatedBy:   tm.ID,
		},
	}
	bulk := make([]*ent.WorkspaceCreate, len(inputs))
	for i, t := range inputs {

		bulk[i] = client.Workspace.Create().SetInput(t)
	}
	if _, err = client.Workspace.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("Workspace failed to seed data: %v", err)
	}
}
