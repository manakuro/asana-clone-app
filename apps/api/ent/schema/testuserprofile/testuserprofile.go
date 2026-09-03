package testuserprofile

import (
	"asana-clone-app/pkg/util/conversion"
	"encoding/json"
	"fmt"
	"io"
)

// TestUserProfile of profile
type TestUserProfile struct {
	Address string `json:"address"`
	Phone   string `json:"phone"`
	Body    TestUserProfileBody
}

// TestUserProfileBody of profile body
//
//nolint:goimports
//revive:disable-next-line:exported
type TestUserProfileBody struct {
	Weight  int `json:"weight"`
	Height  int `json:"height"`
	Comment TestUserProfileBodyComment
}

// TestUserProfileBodyComment of profile body comment
//
//nolint:goimports
//revive:disable-next-line:exported
type TestUserProfileBodyComment struct {
	Type string `json:"type"`
	Text string `json:"text"`
}

// UnmarshalGQL implements the graphql.Unmarshaller interface.
func (t *TestUserProfile) UnmarshalGQL(v interface{}) error {
	return t.Scan(v)
}

// MarshalGQL implements the graphql.Marshaler interface.
func (t TestUserProfile) MarshalGQL(w io.Writer) {
	val, _ := json.Marshal(t)
	_, _ = io.WriteString(w, string(val))
}

// Scan implements the Scanner interface.
func (t *TestUserProfile) Scan(src interface{}) error {

	switch s := src.(type) {
	case map[string]interface{}:
		var val TestUserProfile
		err := conversion.MapToStruct(s, &val)
		if err != nil {
			return fmt.Errorf("testuserprofile: invalid data format %v", s)
		}
		*t = val
	default:
		return fmt.Errorf("testuserprofile: expected map data %v", s)
	}

	return nil
}
