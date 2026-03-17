# Halleyx Custom Dashboard Builder

A full-stack custom dashboard builder that allows users to create personalized dashboards with various widgets, integrated with a Customer Order module.

## 🚀 Tech Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Grid Layout (Drag & Drop)
- Recharts (Charts)
- React Hook Form (Form Validation)
- React Hot Toast (Notifications)
- Axios (HTTP Client)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- REST APIs

## 📋 Features

### Customer Orders Module
- Create, Edit, Delete orders
- Auto-calculate Total Amount (Quantity × Unit Price)
- Status tracking (Pending, In Progress, Completed)
- Right-click context menu
- Form validation

### Dashboard Builder
- Drag & drop widget placement
- Resize widgets
- 7 widget types:
  - Bar Chart
  - Line Chart
  - Pie Chart
  - Area Chart
  - Scatter Plot
  - Table
  - KPI Card
- Widget configuration panel
- Save/Load dashboard layout
- Date filter (Today, Last 7/30/90 Days, All time)
- Responsive design (Desktop, Tablet, Mobile)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB
- Git

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/halleyx
```

Start server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

## 🌐 Running the App

1. Start MongoDB (via MongoDB Compass)
2. Start Backend: `cd server && npm run dev`
3. Start Frontend: `cd client && npm start`
4. Open: `http://localhost:3000`

## 📊 Sample Workflow

### Create Orders:
1. Click **Customer Orders** tab
2. Click **+ Create Order**
3. Fill in customer and order details
4. Click **Submit**

### Build Dashboard:
1. Click **Dashboard** tab
2. Click **Configure Dashboard**
3. Click widgets from sidebar to add
4. Hover widget → Click ⚙️ to configure
5. Set X/Y Axis, colors, metrics
6. Click **Save Configuration**

## 📁 Project Structure
```
halleyx-dashboard/
├── client/                 # React Frontend
│   └── src/
│       ├── components/
│       │   ├── orders/     # Order CRUD
│       │   ├── dashboard/  # Dashboard Builder
│       │   └── widgets/    # Chart Widgets
│       ├── store/          # Zustand State
│       ├── hooks/          # Custom Hooks
│       └── types/          # TypeScript Types
└── server/                 # Node.js Backend
    ├── models/             # MongoDB Models
    └── routes/             # API Routes
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Get all orders |
| POST | `/orders` | Create order |
| PUT | `/orders/:id` | Update order |
| DELETE | `/orders/:id` | Delete order |
| GET | `/dashboard` | Get dashboard layout |
| POST | `/dashboard/save` | Save dashboard layout |

## 🎯 Key Design Decisions

1. **Zustand over Redux** — Simpler, less boilerplate for this scope
2. **React Grid Layout** — Built-in grid snapping and resize
3. **MongoDB** — Flexible schema for widget configurations
4. **TypeScript** — Better code quality and maintainability

## 👨‍💻 Author

Built for Halleyx Full Stack Engineer Challenge 2026