# IDS Project Management System

A comprehensive project management system built with React, TypeScript, Vite, and Tailwind CSS. Designed with the professional theme inspired by Inventer Design Studio.

## 🎨 Design Theme

The application features a modern **dark teal theme** that reflects the professional aesthetic of Inventer Design Studio:

- **Primary Color**: Bright Teal/Cyan (#28A3A3)
- **Background**: Deep Dark Teal (#0A1F1F)
- **Accent Colors**: Various shades of teal for depth and visual hierarchy
- **Typography**: Clean, modern sans-serif fonts with excellent readability

## ✨ Features

### Authentication
- **Login System**: Secure login with demo credentials
- **Protected Routes**: Route protection for authenticated users only
- **Session Management**: LocalStorage-based session handling

### Dashboard & Analytics
- **Main Dashboard**: Real-time project monitoring and analytics
- **Dashboard 1**: Material consumption tracking
- **Live Graphs**: Interactive data visualization with charts
- **Metric Cards**: Key performance indicators at a glance

### Project Management
- **Projects**: Comprehensive project listing and management
- **Work Orders**: Create and manage work orders
- **Approved Work Orders**: Track approved work orders
- **Planning**: Project planning and scheduling
- **Sites**: Manage project sites and locations

### Inventory & Materials
- **Inventory Dashboard**: Track inventory levels and status
- **Materials Section**: Material management and tracking
- **Items**: Item catalog and management
- **Assets Management**: Track and manage project assets

### Approval Workflows
- **My Pending Actions**: Centralized pending approvals dashboard
- **Approvals Flow**: Visualize approval workflows
- **IPC Approvals**: Interim Payment Certificate approvals
- **IR Approvals**: Inspection Request approvals
- **Bid Proposal Approvals**: Manage bid proposal approvals

### Quality & Safety
- **Inspection Requests**: Submit and track inspections
- **IPCs**: Interim Payment Certificates
- **Lab Tests**: Laboratory test results and tracking
- **HSE Environment**: Health, Safety, and Environmental checklists

### Financial Management
- **Bids**: Bid management system
- **Bid Proposals**: Create and submit proposals
- **Budget Tracking**: Real-time budget monitoring

### Team & Documents
- **Staff Management**: User and team management
- **User Overview**: Team member profiles and statistics
- **User Performance**: Performance tracking and analytics
- **Documents**: Document management system
- **Drawing Management**: Technical drawing storage and versioning

### Reporting
- **Reports**: Generate comprehensive reports
- **Query Dashboard**: Custom queries and data analysis

### Settings
- **Settings**: System configuration and preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ids-pro-mang-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

Use these credentials to test the application:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@inventerdesign.com | admin123 |
| Developer | developer@inventerdesign.com | dev123 |
| Manager | manager@inventerdesign.com | manager123 |
| Client | client@inventerdesign.com | client123 |

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3**: Modern React with hooks
- **TypeScript 5.8**: Type-safe development
- **Vite 5.4**: Lightning-fast build tool

### UI & Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **shadcn/ui**: High-quality component library

### State & Data Management
- **TanStack Query 5.83**: Powerful data fetching and caching
- **React Hook Form 7.61**: Form validation and handling
- **Zod 3.25**: Schema validation

### Routing
- **React Router DOM 6.30**: Client-side routing

### Charts & Visualization
- **Recharts 2.15**: Composable charting library
- **date-fns 3.6**: Modern date utility library

### Additional Libraries
- **Sonner**: Beautiful toast notifications
- **cmdk**: Command menu component
- **Vaul**: Drawer component
- **Embla Carousel**: Carousel functionality

## 📁 Project Structure

```
ids-pro-mang-main/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Calendar.tsx    # Calendar component
│   │   ├── DashboardLayout.tsx
│   │   ├── LineChart.tsx
│   │   ├── MetricCard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/              # Page components
│   │   ├── Login.tsx
│   │   ├── Index.tsx
│   │   ├── Dashboard1.tsx
│   │   ├── Projects.tsx
│   │   ├── Staff.tsx
│   │   └── ... (30+ pages)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── styles/             # Additional styles
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎯 Key Features Explained

### Real-Time Updates
- Automatic data refreshing every 30 seconds
- Manual refresh buttons on key dashboards
- Live activity feeds

### Interactive Charts
- Line charts for trend analysis
- Responsive and interactive visualizations
- Customizable time ranges

### Material Consumption Tracking
- Visual consumption percentages
- Real-time inventory updates
- Interactive consumption controls

### Pending Actions Management
- Bulk approval/rejection
- Priority-based filtering
- Due date tracking with overdue alerts
- Search and filter capabilities

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## 🎨 Customizing the Theme

The theme colors are defined in `src/index.css` using CSS custom properties. To customize:

1. Modify the HSL values in the `:root` selector
2. Update `tailwind.config.ts` for additional color utilities
3. Rebuild the application

### Color Variables

```css
--background: 180 50% 6%;       /* Deep Dark Teal */
--foreground: 0 0% 95%;         /* Light Gray/White */
--primary: 180 65% 45%;         /* Bright Teal/Cyan */
--card: 180 40% 8%;             /* Card Background */
--border: 180 30% 20%;          /* Border Color */
```

## 📊 Component Library

### Pre-built Components
- Accordion
- Alert Dialog
- Avatar
- Badge
- Button
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Command Menu
- Context Menu
- Dialog
- Dropdown Menu
- Form
- Hover Card
- Input
- Label
- Menubar
- Navigation Menu
- Popover
- Progress
- Radio Group
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toggle
- Tooltip

## 🔐 Security Features

- Protected routes with authentication checks
- Session management
- XSS protection through React
- Type-safe development with TypeScript

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deployment Platforms

This application can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages
- Any static hosting service

## 📝 License

This project is proprietary software developed for Inventer Design Studio.

## 🤝 Contributing

This is a private project. For contributions, please contact the project administrator.

## 📧 Support

For support and inquiries, please contact:
- Email: support@inventerdesignstudio.com
- Website: https://inventerdesignstudio.com

## 🎉 Acknowledgments

- Design inspiration from Inventer Design Studio
- UI components from shadcn/ui
- Icons from Lucide React
- Chart library by Recharts

---

**Built with ❤️ by Inventer Design Studio**

