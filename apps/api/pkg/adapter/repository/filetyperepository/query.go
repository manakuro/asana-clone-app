package filetyperepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *fileTypeRepository) Get(ctx context.Context, where *model.FileTypeWhereInput) (*model.FileType, error) {
	q := r.client.FileType.Query()

	q, err := where.Filter(q)
	if err != nil {
		return nil, model.NewInvalidParamError(nil)
	}

	res, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, nil)
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *fileTypeRepository) List(ctx context.Context) ([]*model.FileType, error) {
	res, err := r.client.FileType.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *fileTypeRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FileTypeWhereInput) (*model.FileTypeConnection, error) {
	q := r.client.FileType.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithFileTypeFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
