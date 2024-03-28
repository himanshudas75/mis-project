# PhD Admission

### .env file format

```env
MONGODB_URL=
ACCESS_TOKEN_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
```

### Routes

#### User Routes

-   POST /api/register
-   POST /api/login
-   GET /api/verify
-   PUT /api/changePassword
-   DELETE /api/deleteUser
-   GET /api/logout

#### Admin Routes

-   GET /api/admin/verify
-   POST /api/admin/eventDate
-   DELETE /api/admin/eventDate?id=event_id

#### Common Action Routes

-   GET /api/actions/eventDates

#### Complaint Routes

-   POST /api/complaint/register
-   GET /api/complaint/fetch
-   DELETE /api/complaint/reset?order_number=order_number

### Generating a secret

```js
console.log(require('crypto').randomBytes(32).toString('hex'));
```

### To Modify

-   Change image type in complaint scheme
-   Add image uploading feature
-   Currently any user can add a complaint for any user
