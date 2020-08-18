```
http://localhost:5000/register - POST [Registration]

Content-Type: application/json;

[Body] params - {
    username: '',
    password: ''
}

[Response] - sample 1 error validation
{
    "status": "error",
    "message": "Unprocessible Entity",
    "data": [
        {
            "message": "username is required",
            "path": [
                "username"
            ],
            "type": "any.required",
            "context": {
                "label": "username",
                "key": "username"
            }
        },
        {
            "message": "password is required",
            "path": [
                "password"
            ],
            "type": "any.required",
            "context": {
                "label": "password",
                "key": "password"
            }
        }
    ],
    "level": "info"
}

[Body] - {
  username: 'raghuk46',
  password: 'test@123456
}

[Response] - {
    "statusCode": 200,
    "message": "User already Exists",
    "level": "info"
}
```
