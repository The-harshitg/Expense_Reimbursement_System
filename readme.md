Expense Reimbursement System Backend

This project provides the backend for an Expense Reimbursement System using Node.js and Express.js. It allows employees (users) to submit expenses, and managers or finance team (admins) to approve, reject, or mark them as paid. The system uses JWT-based authentication and role-based access control to ensure secure interactions.

Features

Employee (User) Expense Submission: Employees can submit expenses with attached receipts.
Manager/Finance Team (Admin) Approval Workflow: Managers and finance teams can approve or reject submitted expenses.
Expense Status Tracking: Each expense is tracked with statuses such as submitted, approved, rejected, and paid.
Secure Authentication & Authorization: JWT tokens ensure only authorized users can access relevant API endpoints.
File Storage for Receipts: Local or cloud storage for secure storage of expense receipts.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB 
Authentication: JWT (JSON Web Token)
File Storage: Local 
Testing:  Postman

Admin: Managers and finance team members. They can approve, reject,  expenses 
User: Employees who submit expenses for approval.

API Overview
1. Authentication and Authorization
JWT Tokens: Secure access for both admins (managers/finance) and users (employees).
Role-Based Access: Employees have access to submission and viewing, while admins (managers/finance) handle approvals and payments.
2. Expense Submission
POST /expenses: Employees can submit a new expense along with an attached receipt.
GET /expenses/
: View details of a specific expense.
3. Approval Workflow (Admin Only)
PUT /expenses/
/approve: Managers can approve or reject expenses.
GET /expenses: Managers can view all pending expenses for approval.
4. Payment Processing (Admin Only)
PUT /expenses/
/pay: Finance team marks expenses as paid after reimbursement.
