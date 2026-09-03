package projectteammaterepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/projectteammate"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTeammateRepository) Update(ctx context.Context, input model.UpdateProjectTeammateInput) (*model.ProjectTeammate, error) {
	res, err := r.client.
		ProjectTeammate.UpdateOneID(input.ID).
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

func (r *projectTeammateRepository) UpdateOwner(ctx context.Context, input model.UpdateProjectTeammateOwnerInput) (*model.ProjectTeammate, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	_, err := client.ProjectTeammate.
		Update().
		SetIsOwner(false).
		Where(projectteammate.ProjectID(input.ProjectID)).
		Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	q := client.ProjectTeammate.
		Query().
		Where(
			projectteammate.TeammateID(input.TeammateID),
			projectteammate.ProjectID(input.ProjectID),
		)

	repositoryutil.WithProjectTeammate(q)

	projectTeammate, err := q.Only(ctx)

	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if projectTeammate == nil {
		res, perr := client.ProjectTeammate.
			Create().
			SetProjectID(input.ProjectID).
			SetTeammateID(input.TeammateID).
			SetRole("").
			SetIsOwner(true).
			Save(ctx)

		if perr != nil {
			return nil, model.NewDBError(perr)
		}
		return res, perr
	}

	res, err := client.ProjectTeammate.UpdateOneID(projectTeammate.ID).SetIsOwner(true).Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
