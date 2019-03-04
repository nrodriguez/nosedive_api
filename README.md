# nosedive_api
What will you rate them?

# Available Endpoints

## V1
* Get User: `/user/userId`
* Get User Likes: `/user/userId/likes`
* Edit User: `/user/userId/edit`

## V2

Version 2 requires a version number to be sent in the header

* Get User: `/user/userId`
* Get User Likes: `/user/userId/likes`
    * Returns the list of users who have liked the given user
* Edit User: `/user/userId/edit`

Extra Endpoints:
* User Likes Another User: POST `/user/userId/likes/likedUserId`
    * Describes the action of a user clicking like on another user's profile
    * Adds acting user's id to the liked user's information
* User Match: POST `/user/userId/match/matchedUserId`
    * Describes the action of a user clicking match on another user's profile
    * Adds acting user's id to the matched user's information as well as the acting user
* User Rating: POST `/user/userId/rating`
    * Describes the action of giving a user a specific rating
    * Passes in the rating and the user who is doing the rating
* User blocks another User: POST `/user/userId/block/blockedUserId`
    * Describes the action of a user blocking another user
    * The blocked user id is added to the blocker's list

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

### Get
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

### Edit User
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

### User Liking Another User
```
curl --request POST \
  --url http://localhost:3000/users/3/likes/2 \
  --header 'content-type: application/json' \
  --header 'version: 2'
```

Returns:

```
{
  "id": 2,
  "name": "Pamela Beasley",
  "occupation": "Receptionist",
  "likes": [
    {
      "id": 1,
      "date": "Fri, 01 Mar 2019 16:44:39 GMT"
    },
    {
      "id": 3,
      "date": "Fri, 01 Mar 2019 16:49:07 GMT"
    }
  ],
  "matches": [
    {
      "id": 1,
      "date": "Fri, 01 Mar 2019 17:07:47 GMT"
    }
  ],
  "recommendations": [],
  "ratingsCount": {
    "1": {
      "count": 1
    },
    "2": {
      "count": 0
    },
    "3": {
      "count": 14
    },
    "4": {
      "count": 0
    },
    "5": {
      "count": 2
    }
  },
  "rating": 3.1176470588235294,
  "blocked": [
    {
      "id": "3",
      "date": "Fri, 01 Mar 2019 20:52:46 GMT"
    }
  ]
}
```

### User Blocks Another User
```
curl --request POST \
  --url http://localhost:3000/users/2/blocks/3 \
  --header 'content-type: application/json' \
  --header 'version: 2'
```
Returns:

```
{
  "id": 2,
  "name": "Pamela Beasley",
  "occupation": "Receptionist",
  "likes": [
    {
      "id": 1,
      "date": "Fri, 01 Mar 2019 16:44:39 GMT"
    },
    {
      "id": 3,
      "date": "Fri, 01 Mar 2019 16:49:07 GMT"
    }
  ],
  "matches": [
    {
      "id": 1,
      "date": "Fri, 01 Mar 2019 17:07:47 GMT"
    }
  ],
  "recommendations": [],
  "ratingsCount": {
    "1": {
      "count": 1
    },
    "2": {
      "count": 0
    },
    "3": {
      "count": 14
    },
    "4": {
      "count": 0
    },
    "5": {
      "count": 2
    }
  },
  "rating": 3.1176470588235294,
  "blocked": [
    {
      "id": "3",
      "date": "Fri, 01 Mar 2019 20:52:46 GMT"
    },
    {
      "id": "3",
      "date": "Mon, 04 Mar 2019 01:45:02 GMT"
    }
  ]
}
```

### User rates another User

```
curl --request POST \
  --url http://localhost:3000/users/1/rating \
  --header 'content-type: application/json' \
  --header 'version: 2' \
  --data '{
	"ratedUserId": 1,
	"rating": 5.0
}'
```

Returns:

```
{
  "id": 1,
  "name": "Jimothy Halpert",
  "occupation": "Sales Executive",
  "likes": [
    {
      "id": 2,
      "date": "Fri, 01 Mar 2019 16:48:57 GMT"
    }
  ],
  "matches": [
    {
      "id": 2,
      "date": "Fri, 01 Mar 2019 17:07:47 GMT"
    }
  ],
  "recommendations": [],
  "ratingsCount": {
    "1": {
      "count": 0
    },
    "2": {
      "count": 0
    },
    "3": {
      "count": 0
    },
    "4": {
      "count": 0
    },
    "5": {
      "count": 1
    }
  },
  "rating": 5
}
```

### User matches with another User

```
curl --request POST \
  --url http://localhost:3000/users/2/matches/1 \
  --header 'content-type: application/json' \
  --header 'version: 2'
```

```
{
  "id": 2,
  "name": "Pamela Beasley",
  "occupation": "Receptionist",
  "likes": [
    {
      "id": 1,
      "date": "Fri, 01 Mar 2019 16:44:39 GMT"
    },
    {
      "id": 3,
      "date": "Fri, 01 Mar 2019 16:49:07 GMT"
    }
  ],
  "matches": [
    {
      "id": 1,
      "date": "Fri, 01 Mar 2019 17:07:47 GMT"
    }
  ],
  "recommendations": []
}
```