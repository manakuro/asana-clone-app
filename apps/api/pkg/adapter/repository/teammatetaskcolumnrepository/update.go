package teammatetaskcolumnrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/ent/teammatetaskcolumn"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskColumnRepository) Update(ctx context.Context, input model.UpdateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error) {
	res, err := r.client.
		TeammateTaskColumn.UpdateOneID(input.ID).
		SetInput(input).
		Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *teammateTaskColumnRepository) UpdateOrder(ctx context.Context, input model.UpdateTeammateTaskColumnOrderInput) ([]*model.TeammateTaskColumn, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)
	if len(input.IDs) == 0 {
		return nil, model.NewInvalidParamError(input.IDs)
	}

	ts, err := client.TeammateTaskColumn.
		Query().
		WithTaskColumn().
		Where(teammatetaskcolumn.IDIn(input.IDs...)).
		All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	groupedByID := make(map[ulid.ID]*model.TeammateTaskColumn, len(ts))
	for _, t := range ts {
		groupedByID[t.ID] = t
	}

	bulk := make([]*ent.TeammateTaskColumnCreate, len(input.IDs))
	for i, id := range input.IDs {
		g, ok := groupedByID[id]
		if ok {
			bulk[i] = client.TeammateTaskColumn.Create().
				SetID(id).
				SetOrder(i).
				SetTeammateID(g.TeammateID).
				SetTaskColumnID(g.TaskColumnID).
				SetWorkspaceID(g.WorkspaceID).
				SetWidth(g.Width).
				SetCustomizable(g.Customizable).
				SetDisabled(g.Disabled).
				SetCreatedAt(g.CreatedAt)
		}
	}

	err = client.TeammateTaskColumn.CreateBulk(bulk...).OnConflict().UpdateNewValues().Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return ts, nil
}
