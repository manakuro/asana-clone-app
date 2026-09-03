package taskfeedlikerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/taskfeedlike"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFeedLikeRepository) Delete(ctx context.Context, input model.DeleteTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	deleted, err := r.client.TaskFeedLike.Query().Where(taskfeedlike.IDEQ(input.ID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = r.client.TaskFeedLike.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
