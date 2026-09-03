package tasklikerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/tasklike"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskLikeRepository) Delete(ctx context.Context, input model.DeleteTaskLikeInput) (*model.TaskLike, error) {
	deleted, err := r.client.TaskLike.Query().Where(tasklike.IDEQ(input.ID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = r.client.TaskLike.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
