const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    team TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tasks table
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority TEXT DEFAULT 'medium',
    due_date TEXT,
    assigned_to INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
  )`);

  // Task comments table
  db.run(`CREATE TABLE IF NOT EXISTS task_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // Create demo users
  const password = bcrypt.hashSync('password123', 10);
  
  db.run(`INSERT OR IGNORE INTO users (email, password, full_name, team) VALUES 
    ('admin@company.com', ?, 'Admin User', 'Management'),
    ('john@company.com', ?, 'John Doe', 'Development'),
    ('jane@company.com', ?, 'Jane Smith', 'Design'),
    ('mike@company.com', ?, 'Mike Johnson', 'Development')
  `, [password, password, password, password]);

  console.log('Database initialized successfully!');
  console.log('\nDemo accounts:');
  console.log('Email: admin@company.com | Password: password123');
  console.log('Email: john@company.com | Password: password123');
  console.log('Email: jane@company.com | Password: password123');
  console.log('Email: mike@company.com | Password: password123');
});

db.close();
