## API

Scripts are included in curl-scripts to test built-in actions.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

#### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:4741/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
curl-scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:4741/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
curl-scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/

Request:

```sh
curl --include --request PATCH http://localhost:4741/change-password/ \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/

Request:

```sh
curl --include --request DELETE http://localhost:4741/sign-out/ \
  --header "Authorization: Bearer $TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```
### Location


| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/locations`             | `location#create`    |
| GET  | `//locations` | `location#index`  |
| GET  | `/locations/:id` | `location#show`  |
| PATCH  | `/locations/:id` | `location#update`  |
| DELETE | `/locations/:id`        | `location#delete`   |

#### POST /create

Request:

```sh
curl --include --request POST http://localhost:4741/locations \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "location": {
      "location": "anywhere",
      "description": "anything",
      "coordinates": "[-57.9879, 87.35434545]"
    }
  }'
```

```sh
curl-scripts/locations/create.sh
```

#### GET /index

Request:

```sh
curl --include --request GET http://localhost:4741/locations \
     --header "Authorization: Bearer $TOKEN" \
```

```sh
curl-scripts/locations/index.sh
```

#### GET /show

Request:

```sh
curl --include --request GET http://localhost:4741/locations/:id \
     --header "Authorization: Bearer $TOKEN" \
```

```sh
curl-scripts/locations/show.sh
```

#### PATCH /update/

Request:

```sh
curl --include --request PATCH http://localhost:4741/locations/:id \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "location": {
      "location": "new anywhere",
      "description": "new anything",
      "coordinates": "[-57.9879, 87.35434545]"
    }
  }'
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/locations/update.sh
```

#### DELETE /delete

Request:

```sh
curl --include --request DELETE http://localhost:4741/locations/:id\
  --header "Authorization: Bearer $TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/locations/destroy.sh
```