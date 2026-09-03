package handler

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"asana-clone-app/pkg/entity/model"
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

// Following RFC7807 specification
// see https://tools.ietf.org/html/rfc7807
type errorResponse struct {
	Type   string `json:"type"`
	Title  string `json:"title"`
	Status int    `json:"status"`
}

// HandleError responds to error when routing
func HandleError(e echo.Context, err error) error {
	var gr generalError

	if !errors.As(err, &gr) {
		t := "[Internal server error]: Interface conversion error occurred. `err` should be implemented with Error() and Code()"
		fmt.Println(t)
		return e.JSON(http.StatusInternalServerError, errorResponse{
			Type:   e.Path(),
			Title:  t,
			Status: http.StatusInternalServerError,
		})
	}

	er := errorResponse{
		Type:   e.Path(),
		Title:  gr.Error(),
		Status: mapErrorCodeToHTTPStatus(gr.Code()),
	}

	fmt.Println(er.Title)
	return e.JSON(er.Status, er)
}
