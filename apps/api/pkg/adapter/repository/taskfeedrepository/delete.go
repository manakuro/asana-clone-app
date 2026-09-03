package taskfeedrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/taskfeed"
	"asana-clone-app/ent/taskfeedlike"
	"asana-clone-app/ent/taskfile"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFeedRepository) Delete(ctx context.Context, input model.DeleteTaskFeedInput) (*model.DeleteTaskFeedInputPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	payload := &model.DeleteTaskFeedInputPayload{
		TaskFeed:      nil,
		TaskFeedLikes: []*model.TaskFeedLike{},
		TaskFiles:     []*model.TaskFile{},
	}

	deleted, err := client.TaskFeed.Query().Where(taskfeed.IDEQ(input.ID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	taskFeedLikes, err := client.TaskFeedLike.Query().Where(taskfeedlike.TaskFeedID(input.ID)).All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if len(taskFeedLikes) > 0 {
		taskFeedLikeIDs := make([]model.ID, len(taskFeedLikes))
		for i, t := range taskFeedLikes {
			taskFeedLikeIDs[i] = t.ID
		}

		_, err = client.TaskFeedLike.Delete().Where(taskfeedlike.IDIn(taskFeedLikeIDs...)).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
	}

	taskFiles, err := client.TaskFile.Query().Where(taskfile.TaskFeedID(input.ID)).All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if len(taskFiles) > 0 {
		taskFileIDs := make([]model.ID, len(taskFiles))
		for i, t := range taskFiles {
			taskFileIDs[i] = t.ID
		}

		_, err = client.TaskFile.Delete().Where(taskfile.IDIn(taskFileIDs...)).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
	}

	err = client.TaskFeed.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	if taskFeedLikes != nil {
		payload.TaskFeedLikes = taskFeedLikes
	}
	if taskFiles != nil {
		payload.TaskFiles = taskFiles
	}

	payload.TaskFeed = deleted

	return payload, nil
}
