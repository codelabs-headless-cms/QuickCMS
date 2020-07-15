# QuickCMS

## Steps to get started

1. Clone the repository
2. Run ```npm install``` from terminal to install dependencies
3. Run ```npm run dev``` inside the cloned directory from terminal

## API endpoints

### /login

```
post {
  email: string
  password: string
}
```

On success post: `{email}, status: 200`  
On failed post: `status: 401 (Unauthorized)`

### /signup

```
post {
  email: string
  password: string,
  name: string
}
```

On success post: `status: 200`  
On failed post: `{"error": "This email is already taken!"}, status:200`
