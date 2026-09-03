package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TaskFeed generates task seed data.
func TaskFeed(ctx context.Context, client *ent.Client) {
	_, err := client.TaskFeed.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskFeed failed to delete data: %v", err)
	}
	manatoID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID

	isFirstTrue := true

	inputs := []ent.CreateTaskFeedInput{
		// task 1
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			TeammateID:  manatoID,
			Description: seedutil.ParseDescription([]byte(`{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Take a look at the attachment above.","attrs":{"mentionId":"","mentionType":""}}]}]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			TeammateID:  manatoID,
			Description: seedutil.ParseDescription([]byte(`{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Could you give me a review for the proposal?","attrs":{"mentionId":"","mentionType":""}}]}]}`)),
		},

		// task 2
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 3
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task3.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 4
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task4.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 5
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task5.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 6
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task6.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 7
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task7.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 8
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task8.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 9
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task9.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 10
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task10.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 2 - 1
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask1.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 2 - 2
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask2.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 2 - 3
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask3.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},

		/** taskNoAssignedFeed **/
		// task 1
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.task1.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 2
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.task2.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 2 - 1
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.task2Subtask1.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 2 - 2
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.task2Subtask2.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		// task 2 - 3
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.task2Subtask3.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},

		/** Marketing **/
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask1.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask2.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask3.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask4.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask5.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask6.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask7.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask8.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask9.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask10.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask11.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask12.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask13.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
		{
			TaskID:      seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask14.Name).ID,
			TeammateID:  manatoID,
			IsFirst:     &isFirstTrue,
			Description: seedutil.ParseDescription([]byte(`{"type": "doc", "content": [{ "type": "paragraph", "content": null }]}`)),
		},
	}
	bulk := make([]*ent.TaskFeedCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskFeed.Create().SetInput(t)
	}
	if _, err = client.TaskFeed.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskFeed failed to seed data: %v", err)
	}
}
