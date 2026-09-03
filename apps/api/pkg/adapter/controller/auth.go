package controller

import (
	"asana-clone-app/pkg/adapter/handler"
	"asana-clone-app/pkg/entity/model"
	uauth "asana-clone-app/pkg/util/auth"
	"net/http"
)

type authController struct{}

// Auth is an interface of controller.
type Auth interface {
	RevokeRefreshTokens(ctx Context) error
}

// NewAuthController generates test authController controller.
func NewAuthController() Auth {
	return &authController{}
}

func (c *authController) RevokeRefreshTokens(ctx Context) error {
	requestCtx := ctx.Request().Context()

	var params struct {
		UID string `json:"uid"`
	}
	if err := ctx.Bind(&params); err != nil {
		return handler.HandleRestError(ctx, model.NewInvalidParamError(nil))
	}

	client, err := uauth.NewClient(requestCtx)
	if err != nil {
		return err
	}

	if err = client.RevokeRefreshTokens(requestCtx, params.UID); err != nil {
		return handler.HandleRestError(ctx, err)
	}

	return ctx.JSON(http.StatusOK, nil)
}
