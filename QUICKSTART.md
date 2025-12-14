# Corporate To-Do App - Quick Start

## Installation (< 5 minutes)

### Windows Users:
1. **Double-click `install.bat`** - This will:
   - Set up all files
   - Install dependencies
   - Create database
   - Set up demo accounts

2. **Double-click `start-server.bat`** to start the server

3. **Open browser**: http://localhost:3000

### Manual Installation:
```bash
npm install
node create-backend.js
node create-frontend.js
node create-styles.js
node create-app-js.js
npm run init-db
npm start
```

## Login Credentials

Use any of these demo accounts:
- **admin@company.com** / password123
- **john@company.com** / password123
- **jane@company.com** / password123
- **mike@company.com** / password123

## Features

✅ **User Authentication** - Secure login/register
✅ **Task Management** - Create, edit, delete tasks
✅ **Team Collaboration** - Assign tasks to members
✅ **Priority Levels** - Low, Medium, High
✅ **Status Tracking** - To Do, In Progress, Done
✅ **Due Dates** - Set deadlines
✅ **Modern UI** - Microsoft To-Do inspired

## Network Access (for teams)

1. Find your PC's IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Edit `public\app.js`, line 1:
   ```javascript
   const API_URL = 'http://192.168.1.100:3000/api';
   ```

3. Ensure port 3000 is open in Windows Firewall

4. Team members access: `http://192.168.1.100:3000`

## Common Commands

- **Start server**: `npm start`
- **Reset database**: Delete `database.db`, then run `npm run init-db`
- **Change port**: Edit `.env` file, change `PORT=3000` to desired port

## Troubleshooting

### "Port 3000 is already in use"
- Change port in `.env`: `PORT=3001`
- Update `API_URL` in `public/app.js` accordingly

### "Cannot GET /"
- Ensure server is running: `npm start`
- Check console for errors

### "Failed to fetch"
- Verify API_URL in `public/app.js` matches your server address
- Check if server is running

## Tech Stack

- **Backend**: Node.js + Express + SQLite
- **Frontend**: Vanilla JavaScript + CSS
- **Auth**: JWT tokens + bcrypt

## File Structure

```
todolist 2/
├── middleware/       # Auth middleware
├── routes/          # API routes
├── public/          # Frontend files
├── database.db      # SQLite database
├── server.js        # Main server
└── .env            # Configuration
```

## Production Deployment

For 24/7 operation, use PM2:
```bash
npm install -g pm2
pm2 start server.js --name "todo-app"
pm2 save
pm2 startup
```

## Support

See `README_FULL.md` for complete documentation.

---

**Security Note**: Change `JWT_SECRET` in `.env` before production use!
