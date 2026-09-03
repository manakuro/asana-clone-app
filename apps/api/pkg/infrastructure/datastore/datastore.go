package datastore

import (
	"asana-clone-app/config"
	"asana-clone-app/ent"
	"crypto/tls"
	"fmt"
	"log"

	"entgo.io/ent/dialect"

	"github.com/go-sql-driver/mysql"
)

// New returns data source name
func New() string {
	params := map[string]string{
		"parseTime": config.C.Database.Params.ParseTime,
		"charset":   config.C.Database.Params.Charset,
		"loc":       config.C.Database.Params.Loc,
	}
	if config.C.Database.Params.TLS != "" && config.C.Database.Params.TLS != "true" {
		err := mysql.RegisterTLSConfig(config.C.Database.Params.TLS, &tls.Config{
			MinVersion: tls.VersionTLS12,
			ServerName: config.C.Database.Addr,
		})
		if err != nil {
			log.Fatalln("failed to create TLS config: ", err)
		}
	}
	if config.C.Database.Params.TLS != "" {
		params["tls"] = config.C.Database.Params.TLS
	}

	mc := mysql.Config{
		User:                 config.C.Database.User,
		Passwd:               config.C.Database.Password,
		Net:                  config.C.Database.Net,
		Addr:                 config.C.Database.Addr,
		DBName:               config.C.Database.DBName,
		AllowNativePasswords: config.C.Database.AllowNativePasswords,
		Params:               params,
	}
	fmt.Println("DSN: ", mc.FormatDSN())

	return mc.FormatDSN()
}

// NewClientOptions is an option for NewClient.
type NewClientOptions struct {
	Debug bool
}

// NewClient returns an orm client
func NewClient(options NewClientOptions) (*ent.Client, error) {
	var entOptions []ent.Option

	if options.Debug {
		entOptions = append(entOptions, ent.Debug())
	}

	d := New()

	return ent.Open(dialect.MySQL, d, entOptions...)
}
