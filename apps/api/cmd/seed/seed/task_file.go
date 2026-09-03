package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TaskFile generates task file data.
func TaskFile(ctx context.Context, client *ent.Client) {
	_, err := client.TaskFile.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskFile failed to delete data: %v", err)
	}
	appDevelopmentProject := seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name)
	task1 := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name)
	feeds := seedutil.GetTaskFeeds(ctx, client, task1.ID)

	imageFileType := seedutil.GetFileType(ctx, client, fileTypeSeed.image.Name)
	pdfFileType := seedutil.GetFileType(ctx, client, fileTypeSeed.pdf.Name)
	textFileType := seedutil.GetFileType(ctx, client, fileTypeSeed.text.Name)

	inputs := []ent.CreateTaskFileInput{
		{
			ProjectID:  appDevelopmentProject.ID,
			TaskID:     task1.ID,
			TaskFeedID: feeds[0].ID,
			FileTypeID: imageFileType.ID,
			Name:       "/images/cat_img.png",
			Src:        "/images/cat_img.png",
		},
		{
			ProjectID:  appDevelopmentProject.ID,
			TaskID:     task1.ID,
			TaskFeedID: feeds[0].ID,
			FileTypeID: pdfFileType.ID,
			Name:       "/files/pdf-test.pdf",
			Src:        "/files/pdf-test.pdf",
		},
		{
			ProjectID:  appDevelopmentProject.ID,
			TaskID:     task1.ID,
			TaskFeedID: feeds[0].ID,
			FileTypeID: pdfFileType.ID,
			Name:       "/files/pdf-test-2.pdf",
			Src:        "/files/pdf-test-2.pdf",
		},
		{
			ProjectID:  appDevelopmentProject.ID,
			TaskID:     task1.ID,
			TaskFeedID: feeds[0].ID,
			FileTypeID: textFileType.ID,
			Name:       "/files/test.js",
			Src:        "/files/test.js",
		},
	}
	bulk := make([]*ent.TaskFileCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskFile.Create().SetInput(t)
	}
	if _, err = client.TaskFile.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskFile failed to seed data: %v", err)
	}
}
