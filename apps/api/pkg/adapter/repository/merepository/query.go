package merepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/teammate"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *meRepository) Get(ctx context.Context, id model.ID) (*model.Me, error) {
	q := r.client.Teammate.Query()

	if id == "" {
		return nil, model.NewInvalidParamError(map[string]interface{}{
			"id": id,
		})
	}
	q.Where(teammate.IDEQ(id))

	me, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"id": id,
			})
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	return &model.Me{
		ID:        me.ID,
		Name:      me.Name,
		Image:     me.Image,
		Email:     me.Email,
		CreatedAt: me.CreatedAt,
		UpdatedAt: me.UpdatedAt,
	}, nil
}
