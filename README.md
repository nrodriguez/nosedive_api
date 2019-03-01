# nosedive_api
What will you rate?


# Sample Curls

## Version 1

### V1 Get
```
curl --request GET \
  --url http://localhost:3000/users/1/likes \
  --header 'content-type: application/json'
```
Returns:

```
{
  "userId": "1",
  "likes": [
    {
      "id": 2,
      "date": "3/4/2019 12:00pm"
    },
    {
      "id": 3,
      "date": "3/4/2019 2:00pm"
    }
  ]
}
```

### V1 Edit User
```
curl --request GET \
  --url http://localhost:3000/users/1/likes \
  --header 'content-type: application/json'
```

Returns:

```
{
  "id": 1,
  "name": "Jimothy Halpert",
  "occupation": "Sales Executive",
  "likes": [
    {
      "2": {
        "creationDate": "3/4/2019 12:00pm",
        "previouslyUnliked": false
      }
    },
    {
      "3": {
        "creationDate": "3/4/2019 2:00pm",
        "previouslyUnliked": false
      }
    }
  ]
}
```

## Version 2

Version 2 requires a version to be sent in the header

### V2 Get
```
curl --request GET \
  --url http://localhost:3000/users/1/likes \
  --header 'content-type: application/json' \
  --header 'version: 2'
```

Returns:

```
[
  {
    "id": 2,
    "date": "3/4/2019 12:00pm"
  },
  {
    "id": 3,
    "date": "3/4/2019 2:00pm"
  }
]
```

### V2 Edit User
```
curl --request POST \
  --url http://localhost:3000/users/1/edit \
  --header 'content-type: application/json' \
  --data '{
	"name": "Jimothy Halpert",
	"occupation": "Sales Executive"
}'
```

Returns:

```{
  "id": 1,
  "name": "Jimothy Halpert",
  "occupation": "Sales Executive",
  "likes": [
    {
      "id": 2,
      "date": "3/4/2019 12:00pm"
    },
    {
      "id": 3,
      "date": "3/4/2019 2:00pm"
    }
  ]
}
```

