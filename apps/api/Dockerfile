FROM golang:1.25-alpine AS build

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /go/src

COPY . .
RUN go mod download
RUN go build -o app ./cmd/app

FROM alpine

RUN apk add --no-cache tzdata

COPY --from=build /go/src/app /go/src/app
COPY --from=build /go/src/config /go/src/config
COPY --from=build /go/src/.keys /go/src/.keys


EXPOSE 8080

WORKDIR /go/src

CMD ["./app"]
