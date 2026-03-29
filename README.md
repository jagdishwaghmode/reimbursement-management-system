# reimbursement-management-system

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - 🌐 **Main Server:** [http://localhost:3000](http://localhost:3000)
   - 🔐 **Auth Routes:** [http://localhost:3000/auth](http://localhost:3000/auth)
   - 💰 **Expense Routes:** [http://localhost:3000/expense](http://localhost:3000/expense)
   - ✅ **Approval Routes:** [http://localhost:3000/approval](http://localhost:3000/approval)

## API Endpoints

### Authentication
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login user

### Expenses
- **POST** `/expense/create` - Create a new expense

### Approvals
- **POST** `/approval/action` - Approve or reject an expense

## Configuration

Update the database configuration in `config/db.js`:
```javascript
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "reimbursement_db"
});
```