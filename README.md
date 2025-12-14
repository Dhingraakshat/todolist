# Corporate To-Do Application

A full-stack corporate to-do application with user authentication, team collaboration, and Microsoft To-Do inspired UI. Teams can deploy this on their own servers and manage tasks with user accounts.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, edit, update, and delete tasks
- **Team Collaboration**: Assign tasks to team members
- **Priority Levels**: Low, Medium, High priority tasks
- **Status Tracking**: To Do, In Progress, Done
- **Due Dates**: Set deadlines for tasks
- **Modern UI**: Microsoft To-Do inspired corporate design
- **SQLite Database**: Lightweight, file-based database (easy to deploy)

## Tech Stack

**Backend:**
- Node.js with Express
- SQLite3 database
- JWT authentication
- bcryptjs for password hashing

**Frontend:**
- Vanilla JavaScript (no framework required)
- Modern CSS with CSS variables
- Responsive design
- Microsoft Fluent Design inspired

## Installation

### Prerequisites
- Node.js (v14 or higher) installed on your PC
- npm (comes with Node.js)

### Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Set up the application structure**
```bash
node create-backend.js
node create-frontend.js
```

3. **Initialize the Database**
```bash
npm run init-db
```

This will create the database and add demo user accounts:
- Email: `admin@company.com` | Password: `password123`
- Email: `john@company.com` | Password: `password123`
- Email: `jane@company.com` | Password: `password123`
- Email: `mike@company.com` | Password: `password123`

4. **Start the Server**
```bash
npm start
```

5. **Access the Application**
Open your browser and go to: `http://localhost:3000`

## Quick Install (Windows)

Simply run the `install.bat` file to automatically set everything up!

## Configuration

Edit the `.env` file to customize:

```env
PORT=3000                          # Server port
JWT_SECRET=your-secret-key         # Change this for production!
NODE_ENV=development
```

## Usage

### For Users

1. **Login**: Use your company email and password
2. **Create Tasks**: Click "New Task" button
3. **Manage Tasks**: Edit, update status, or delete tasks
4. **Assign Tasks**: Assign tasks to team members
5. **Filter**: Use sidebar to filter by status (All, To Do, In Progress, Done)

### For Administrators

**Adding New Users:**
Users can register themselves, or you can add them via the database or registration endpoint.

**Database Location:**
`database.db` file in the root directory

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/:id/comments` - Get task comments
- `POST /api/tasks/:id/comments` - Add comment

### Users
- `GET /api/users` - Get all users
- `GET /api/users/me` - Get current user

## Deployment

### On Your Own PC

The application is ready to run on your local machine. Simply follow the installation steps above.

### On a Local Network Server

1. Change `API_URL` in `public/app.js` to your server's IP:
```javascript
const API_URL = 'http://YOUR_SERVER_IP:3000/api';
```

2. Update `.env` file if needed

3. Make sure port 3000 is accessible on your network

4. Start the server: `npm start`

5. Team members can access: `http://YOUR_SERVER_IP:3000`

### Using PM2 for Production (keeps server running)

```bash
npm install -g pm2
pm2 start server.js --name "corporate-todo"
pm2 save
pm2 startup
```

## Security Notes

⚠️ **Important for Production:**

1. **Change JWT Secret**: Update `JWT_SECRET` in `.env` file
2. **Use HTTPS**: Deploy behind a reverse proxy (nginx) with SSL
3. **Strong Passwords**: Enforce strong password policy
4. **Regular Backups**: Backup `database.db` regularly
5. **Update Dependencies**: Keep npm packages updated

## Troubleshooting

**Port already in use:**
Change `PORT` in `.env` file to another port (e.g., 3001)

**Cannot connect to server:**
- Check if server is running: `npm start`
- Verify firewall settings
- Check network connectivity

**Database errors:**
Delete `database.db` and run `npm run init-db` again

## File Structure

```
corporate-todo-app/
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── tasks.js          # Task management routes
│   └── users.js          # User routes
├── public/
│   ├── index.html        # Frontend HTML
│   ├── styles.css        # Corporate styling
│   └── app.js            # Frontend JavaScript
├── .env                  # Environment variables
├── database.js           # Database connection
├── init-db.js            # Database initialization
├── server.js             # Express server
├── package.json          # Dependencies
└── database.db           # SQLite database (created after init)
```

## License

MIT License - Feel free to use this for your organization

## Support

For issues or questions, refer to the documentation or modify the code to suit your needs.
