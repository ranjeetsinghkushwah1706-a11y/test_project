# Contract Management Platform

A frontend-only Contract Management Platform built with React, TypeScript, and Context API. This application demonstrates product thinking, UI design, state management, and clean code architecture.

## 🚀 Features

### 1. Blueprint Management
- Create reusable contract templates (Blueprints)
- Configure fields with types: Text, Date, Signature, Checkbox
- Set field positions (x, y coordinates)
- Edit and delete blueprints
- Visual preview of blueprints

### 2. Contract Creation
- Generate contracts from existing blueprints
- Inherit all fields from selected blueprint
- Auto-generate forms based on field types
- Fill contract values
- Save contracts with initial status: CREATED

### 3. Contract Lifecycle Management
- **Lifecycle Flow**: CREATED → APPROVED → SENT → SIGNED → LOCKED
- **Revocation**: Can occur from CREATED or SENT states
- **Rules Enforcement**:
  - No skipping states (controlled transitions)
  - Locked contracts are read-only
  - Revoked contracts cannot proceed further
  - Only valid transitions are allowed

### 4. Contract Dashboard
- Table view of all contracts
- Filter by status:
  - **Active**: CREATED, APPROVED, SENT
  - **Pending**: CREATED, APPROVED
  - **Signed**: SIGNED, LOCKED
- View contract details
- Status badges with color coding

### 5. Contract Details Screen
- Display contract information
- Show current status badge
- Conditional action buttons based on lifecycle rules
- Edit contract fields (when allowed)
- Change contract status (with validation)

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **localStorage** - Data persistence
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
src/
├── components/
│   ├── Blueprint/
│   │   ├── BlueprintForm.tsx      # Form to create/edit blueprints
│   │   └── BlueprintPreview.tsx    # Visual preview of blueprint
│   ├── Contract/
│   │   ├── ContractForm.tsx         # Form to fill contract fields
│   │   └── ContractActions.tsx     # Status change action buttons
│   ├── Dashboard/
│   │   ├── ContractTable.tsx       # Table displaying contracts
│   │   └── ContractFilters.tsx    # Filter buttons for contracts
│   └── Common/
│       ├── Button.tsx              # Reusable button component
│       ├── StatusBadge.tsx         # Status badge component
│       └── Layout.tsx              # Main layout with navigation
├── context/
│   ├── BlueprintContext.tsx        # Blueprint state management
│   └── ContractContext.tsx         # Contract state management
├── models/
│   ├── Blueprint.ts                # Blueprint type definitions
│   ├── Contract.ts                 # Contract type definitions
│   └── Field.ts                    # Field type definitions
├── pages/
│   ├── Blueprints.tsx              # Blueprint management page
│   ├── CreateContract.tsx          # Contract creation page
│   ├── ContractDetails.tsx        # Contract details and editing
│   └── ContractsDashboard.tsx      # Main dashboard page
├── utils/
│   ├── lifecycle.ts                # Lifecycle transition logic
│   └── storage.ts                  # localStorage operations
├── App.tsx                         # Main app component with routing
└── main.tsx                        # Application entry point
```

## 🏗️ Architecture & Design Decisions

### State Management
- **Context API** chosen over Redux for simplicity and built-in React support
- Separate contexts for Blueprints and Contracts for better separation of concerns
- State persisted to localStorage on every mutation

### Data Models
- **Blueprint**: Template with configurable fields
- **Contract**: Instance created from blueprint with values and status
- **Field**: Reusable field definition with type, label, position, and value

### Lifecycle Management
- Centralized lifecycle rules in `utils/lifecycle.ts`
- Transition validation prevents invalid state changes
- UI dynamically shows/hides actions based on current status

### Component Architecture
- **Functional Components**: All components use React hooks
- **Separation of Concerns**: Pages handle routing, components handle UI
- **Reusability**: Common components (Button, StatusBadge) used throughout
- **Type Safety**: Full TypeScript coverage

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Responsive Design**: Mobile-friendly layouts
- **Consistent Design System**: Color-coded status badges, consistent button styles

## 📦 Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contract-management-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 Usage Guide

### Creating a Blueprint

1. Navigate to **Blueprints** page
2. Click **Create Blueprint**
3. Enter blueprint name
4. Add fields:
   - Select field type (Text, Date, Signature, Checkbox)
   - Enter field label
   - Set X and Y positions
5. Click **Save Blueprint**

### Creating a Contract

1. Navigate to **Create Contract** page
2. Select a blueprint from dropdown
3. Click **Continue**
4. Fill in contract name
5. Fill values for all fields
6. Click **Save Contract**

### Managing Contract Lifecycle

1. View contract from dashboard
2. On contract details page, use action buttons:
   - **Approve**: Move from CREATED to APPROVED
   - **Send**: Move from APPROVED to SENT
   - **Sign**: Move from SENT to SIGNED
   - **Lock**: Move from SIGNED to LOCKED
   - **Revoke**: Move from CREATED or SENT to REVOKED
3. Only valid transitions are shown/enabled

### Filtering Contracts

- Use filter buttons on dashboard:
  - **All**: Show all contracts
  - **Active**: Show CREATED, APPROVED, SENT
  - **Pending**: Show CREATED, APPROVED
  - **Signed**: Show SIGNED, LOCKED

## 🔒 Assumptions & Limitations

### Assumptions
1. **No Backend**: All data stored in browser localStorage
2. **Single User**: No authentication or multi-user support
3. **Simple Positioning**: Field positions are numeric (x, y) - no drag-and-drop
4. **Basic Signature**: Signature field is text input (not actual signature capture)
5. **No Validation**: Field values are not validated beyond required fields

### Limitations
1. **Data Persistence**: Data is lost if localStorage is cleared
2. **No Collaboration**: No real-time updates or sharing
3. **No File Export**: Cannot export contracts as PDF or other formats
4. **No Search**: No search functionality for contracts or blueprints
5. **No Pagination**: All contracts displayed in single table
6. **Browser Only**: Not optimized for mobile devices

## 🧪 Testing

Currently, no automated tests are included. Manual testing covers:
- Blueprint creation and editing
- Contract creation from blueprints
- Contract lifecycle transitions
- Filtering and navigation
- Data persistence (localStorage)

## 📝 Future Enhancements

Potential improvements:
- Drag-and-drop field placement
- Visual timeline for contract lifecycle
- PDF export functionality
- Search and advanced filtering
- Unit and integration tests
- Responsive mobile design
- Field validation rules
- Actual signature capture
- Contract templates library

## 📄 License

This project is created for assignment purposes.

## 👤 Author

Built as a frontend assignment demonstrating:
- Product thinking
- UI/UX design
- State management
- Clean code architecture
- TypeScript best practices
