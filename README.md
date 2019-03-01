# nosedive_api
What will you rate?


## Sample Curls

### V1 Get
```
curl --request GET \
  --url http://localhost:3000/users/1/likes \
  --header 'content-type: application/json'
```

### V1 Edit User
```
curl --request GET \
  --url http://localhost:3000/users/1/likes \
  --header 'content-type: application/json'
```

### V2 Get
```
curl --request GET \
  --url http://localhost:3000/users/1/likes \
  --header 'content-type: application/json' \
  --header 'version: 2'
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

