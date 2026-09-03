package taskfeedrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFeedRepository) Undelete(ctx context.Context, input model.UndeleteTaskFeedInput) (*model.UndeleteTaskFeedInputPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	payload := &model.UndeleteTaskFeedInputPayload{
		TaskFeed:      nil,
		TaskFeedLikes: []*model.TaskFeedLike{},
		TaskFiles:     []*model.TaskFile{},
	}

	createdTaskFeed, err := client.
		TaskFeed.
		Create().
		SetID(input.TaskFeed.ID).
		SetTaskID(input.TaskFeed.TaskID).
		SetTeammateID(input.TaskFeed.TeammateID).
		SetIsFirst(input.TaskFeed.IsFirst).
		SetIsPinned(input.TaskFeed.IsPinned).
		SetDescription(input.TaskFeed.Description).
		SetCreatedAt(input.TaskFeed.CreatedAt).
		SetUpdatedAt(input.TaskFeed.UpdatedAt).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	var createdTaskFeedLikes []*model.TaskFeedLike
	if len(input.TaskFeedLikes) > 0 {
		bulk := make([]*ent.TaskFeedLikeCreate, len(input.TaskFeedLikes))
		for i, t := range input.TaskFeedLikes {
			bulk[i] = client.TaskFeedLike.Create().
				SetID(t.ID).
				SetTaskID(t.TaskID).
				SetTaskFeedID(t.TaskFeedID).
				SetTeammateID(t.TeammateID).
				SetCreatedAt(t.CreatedAt).
				SetUpdatedAt(t.UpdatedAt)
		}
		createdTaskFeedLikes, err = client.TaskFeedLike.CreateBulk(bulk...).Save(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
	}

	var createdTaskFiles []*model.TaskFile
	if len(input.TaskFiles) > 0 {
		bulk := make([]*ent.TaskFileCreate, len(input.TaskFiles))
		for i, t := range input.TaskFiles {
			bulk[i] = client.TaskFile.Create().
				SetID(t.ID).
				SetTaskID(t.TaskID).
				SetTaskFeedID(t.TaskFeedID).
				SetName(t.Name).
				SetSrc(t.Src).
				SetAttached(t.Attached).
				SetFileTypeID(t.FileTypeID).
				SetProjectID(t.ProjectID).
				SetCreatedAt(t.CreatedAt).
				SetUpdatedAt(t.UpdatedAt)
		}
		createdTaskFiles, err = client.TaskFile.CreateBulk(bulk...).Save(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
	}

	if createdTaskFeedLikes != nil {
		payload.TaskFeedLikes = createdTaskFeedLikes
	}
	if createdTaskFiles != nil {
		payload.TaskFiles = createdTaskFiles
	}
	payload.TaskFeed = createdTaskFeed

	return payload, nil
}
