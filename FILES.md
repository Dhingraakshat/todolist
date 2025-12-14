# Corporate To-Do Application - Complete Package

## 🎯 What You Have

A complete, production-ready corporate to-do application that you can deploy on your own PC for your team to use!

## 📦 Package Contents

### Core Application Files
- **server.js** - Main Express server
- **database.js** - SQLite database connection
- **init-db.js** - Database initialization script
- **package.json** - Node.js dependencies and scripts
- **.env** - Environment configuration

### Setup Scripts (used during installation)
- **create-backend.js** - Creates backend API files
- **create-frontend.js** - Creates frontend HTML
- **create-styles.js** - Creates CSS styling
- **create-app-js.js** - Creates frontend JavaScript

### Installation Files
- **install.bat** - Automated Windows installation (RECOMMENDED)
- **start-server.bat** - Easy server startup (created during install)

### Documentation
- **README_FULL.md** - Complete documentation
- **QUICKSTART.md** - Quick start guide
- **INSTALL.txt** - Simple installation instructions
- **FILES.md** - This file

### Configuration
- **.gitignore** - Git ignore rules
- **.env** - Server configuration (port, JWT secret, etc.)

## 🚀 Getting Started

### EASIEST WAY (Windows):
1. **Double-click**: `install.bat`
2. Wait for installation to complete
3. **Double-click**: `start-server.bat`
4. Open browser: **http://localhost:3000**
5. Login with: **admin@company.com** / **password123**

### Alternative (Command Line):
```bash
npm install
node create-backend.js
node create-frontend.js
node create-styles.js
node create-app-js.js
npm run init-db
npm start
```

## 📁 Generated Directories (after installation)

### middleware/
- **auth.js** - JWT authentication middleware

### routes/
- **auth.js** - User registration and login endpoints
- **tasks.js** - Task management endpoints (CRUD operations)
- **users.js** - User management endpoints

### public/
- **index.html** - Main application interface
- **styles.css** - Microsoft To-Do inspired styling
- **app.js** - Frontend application logic

### Database
- **database.db** - SQLite database (created after init-db)

## 🎨 Features

✅ **User Authentication**
   - Secure registration with password hashing
   - JWT token-based authentication
   - Session management

✅ **Task Management**
   - Create, read, update, delete tasks
   - Set task priorities (Low, Medium, High)
   - Track status (To Do, In Progress, Done)
   - Set due dates
   - Add descriptions

✅ **Team Collaboration**
   - Assign tasks to team members
   - View all users in the system
   - See who created each task
   - Team filtering

✅ **Modern UI**
   - Microsoft Fluent Design inspired
   - Responsive layout
   - Clean, corporate aesthetic
   - Intuitive task management
   - Modal dialogs for task creation/editing

## 👥 Demo Accounts

After initialization, you'll have these test accounts:

| Email                  | Password     | Team        |
|------------------------|--------------|-------------|
| admin@company.com      | password123  | Management  |
| john@company.com       | password123  | Development |
| jane@company.com       | password123  | Design      |
| mike@company.com       | password123  | Development |

## 🌐 Network Deployment

To let your team access from other computers:

1. Find your PC's IP address:
   ```bash
   ipconfig
   ```
   (Look for IPv4 Address, e.g., 192.168.1.100)

2. Edit `public/app.js`, line 1:
   ```javascript
   const API_URL = 'http://YOUR_IP:3000/api';
   ```

3. Open port 3000 in Windows Firewall

4. Share the URL with your team: `http://YOUR_IP:3000`

## ⚙️ Configuration

### Change Server Port
Edit `.env`:
```
PORT=3001
```

### Change JWT Secret (IMPORTANT for production!)
Edit `.env`:
```
JWT_SECRET=your-very-secure-random-string-here
```

### Change API URL (for network access)
Edit `public/app.js`:
```javascript
const API_URL = 'http://YOUR_SERVER_IP:3000/api';
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: 7-day expiration
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: HTML escaping on frontend
- **CORS Enabled**: For API access

## 📊 Database Schema

### users
- id (PRIMARY KEY)
- email (UNIQUE)
- password (hashed)
- full_name
- team
- created_at

### tasks
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- title
- description
- status (todo/in_progress/done)
- priority (low/medium/high)
- due_date
- assigned_to (FOREIGN KEY)
- created_at
- updated_at

### task_comments
- id (PRIMARY KEY)
- task_id (FOREIGN KEY)
- user_id (FOREIGN KEY)
- comment
- created_at

## 🛠️ Tech Stack

**Backend:**
- Node.js v14+
- Express 4.18
- SQLite3 5.1
- JWT (jsonwebtoken 9.0)
- bcryptjs 2.4

**Frontend:**
- Vanilla JavaScript (ES6+)
- Modern CSS (CSS Variables, Flexbox, Grid)
- No external frameworks required

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/:id/comments` - Get task comments
- `POST /api/tasks/:id/comments` - Add comment to task

### Users
- `GET /api/users` - Get all users
- `GET /api/users/me` - Get current user profile

## 🚨 Troubleshooting

### Installation Issues

**"npm is not recognized"**
- Install Node.js from https://nodejs.org/
- Restart your computer

**"Port 3000 is already in use"**
- Change PORT in `.env` to 3001
- Update API_URL in `public/app.js`

**"Cannot find module"**
- Run: `npm install`

### Runtime Issues

**"Failed to fetch"**
- Ensure server is running: `npm start`
- Check API_URL matches server address
- Verify no firewall blocking

**"Invalid token"**
- Logout and login again
- Clear browser localStorage

**Database errors**
- Delete `database.db`
- Run: `npm run init-db`

## 📈 Production Deployment

For 24/7 server operation:

```bash
# Install PM2 globally
npm install -g pm2

# Start app with PM2
pm2 start server.js --name "corporate-todo"

# Save configuration
pm2 save

# Enable startup on boot
pm2 startup
```

## 🔄 Backup & Restore

### Backup Database
Simply copy `database.db` file to a safe location

### Restore Database
Replace `database.db` with your backup

### Export Users/Tasks
```bash
sqlite3 database.db .dump > backup.sql
```

## 📱 Future Enhancements

Ideas for customization:
- Email notifications
- File attachments to tasks
- Task comments and discussions
- Advanced filtering and search
- Task categories/projects
- Calendar view
- Mobile app
- Dark mode
- Activity timeline
- Reports and analytics

## 📄 License

MIT License - Free for commercial and personal use

## 🤝 Support

- Read `README_FULL.md` for detailed documentation
- Read `QUICKSTART.md` for quick reference
- Check `INSTALL.txt` for installation help

## ✅ Checklist

Before deploying to your team:

- [ ] Install completed successfully
- [ ] Server starts without errors
- [ ] Can login with demo accounts
- [ ] Can create/edit/delete tasks
- [ ] Can assign tasks to users
- [ ] Changed JWT_SECRET in .env
- [ ] Updated API_URL for network access (if needed)
- [ ] Port 3000 accessible on network
- [ ] Created your own user accounts
- [ ] Deleted demo accounts (optional)

## 🎉 You're Ready!

Your corporate to-do application is ready to use. Start the server and begin managing tasks with your team!

**Quick Commands:**
- Start: `npm start` or double-click `start-server.bat`
- Stop: Press `Ctrl+C` in the terminal
- Reset: Delete `database.db` and run `npm run init-db`

---

**Created with ❤️ for your team's productivity**
