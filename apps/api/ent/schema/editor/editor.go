// Package editor defines the schema for the editor.
package editor

import (
	"encoding/json"
	"fmt"
	"io"
	"project-management-demo-backend/pkg/util/conversion"
)

// Attrs is a custom attributes
type Attrs struct {
	MentionID   string `json:"mentionId"`
	MentionType string `json:"mentionType"`
}

// Content is a content
type Content struct {
	Type  string `json:"type"`
	Text  string `json:"text"`
	Attrs Attrs  `json:"attrs"`
}

// DescriptionContent is a content
type DescriptionContent struct {
	Type    string    `json:"type"`
	Content []Content `json:"content"`
}

// Description is a json type of description
type Description struct {
	Type    string               `json:"type"`
	Content []DescriptionContent `json:"content"`
}

// DescriptionWithTypename is a json type of description with __typename
type DescriptionWithTypename struct {
	Type     string               `json:"type"`
	Content  []DescriptionContent `json:"content"`
	Typename string               `json:"__typename"`
}

// DefaultValue returns default json value for editor.
func (d *Description) DefaultValue() Description {
	return Description{
		Type:    "doc",
		Content: []DescriptionContent{},
	}
}

// UnmarshalGQL implements the graphql.Unmarshaller interface.
func (d *Description) UnmarshalGQL(v interface{}) error {
	return d.Scan(v)
}

// MarshalGQL implements the graphql.Marshaler interface.
func (d Description) MarshalGQL(w io.Writer) {
	descriptionWithTypename := &DescriptionWithTypename{
		Typename: "EditorDescription",
		Content:  d.Content,
		Type:     d.Type,
	}

	val, _ := json.Marshal(descriptionWithTypename)
	_, _ = io.WriteString(w, string(val))
}

// Scan implements the Scanner interface.
func (d *Description) Scan(src interface{}) error {
	switch s := src.(type) {
	case map[string]interface{}:
		var val Description
		err := conversion.MapToStruct(s, &val)
		if err != nil {
			return fmt.Errorf("editor: invalid data  format %v", s)
		}
		*d = val
	default:
		return fmt.Errorf("editor: exptect map data %v", s)
	}

	return nil
}
