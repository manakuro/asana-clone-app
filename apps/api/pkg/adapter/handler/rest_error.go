package handler

import (
	"asana-clone-app/pkg/entity/model"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
)

var codeToStatusMap = map[string]int{
	model.NotFoundError:       http.StatusUnprocessableEntity,
	model.DBError:             http.StatusInternalServerError,
	model.ValidationError:     http.StatusBadRequest,
	model.BadRequestError:     http.StatusBadRequest,
	model.AuthError:           http.StatusUnauthorized,
	model.InternalServerError: http.StatusInternalServerError,
}

func mapErrorCodeToHTTPStatus(c string) int {
	return codeToStatusMap[c]
}

type generalError interface {
	Code() string
	Error() string
}

type errorResponse struct {
	Type   string `json:"type"`
	Title  string `json:"title"`
	Status int    `json:"status"`
}

// HandleRestError handles rest api error.
func HandleRestError(c echo.Context, err error) error {
	var ge generalError

	if !errors.As(err, &ge) {
		return c.JSON(http.StatusInternalServerError, errorResponse{
			Type:   c.Path(),
			Title:  "[Internal server error]: Interface conversion error occurred. `err` should be implemented with Error() and Code()",
			Status: http.StatusInternalServerError,
		})
	}

	er := errorResponse{
		Type:   c.Path(),
		Title:  ge.Error(),
		Status: mapErrorCodeToHTTPStatus(ge.Code()),
	}

	return c.JSON(er.Status, er)
}
