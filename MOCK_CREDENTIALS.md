# Mock Login Credentials

This file contains the mock credentials for testing the different user roles in the Xitique App.

## 🔐 Login Credentials

### 1. Admin User
- **Email**: `admin@xitique.com`
- **Password**: `admin123`
- **Role**: Admin
- **Organization**: Xitique Central
- **Access**: Full access to dashboard, settings, reports, and all management features
- **Redirects to**: `/dashboard/overview`

### 2. Cobrador (Collector) User
- **Email**: `cobrador@xitique.com`
- **Password**: `cobrador123`
- **Role**: Collector
- **Organization**: Xitique Central
- **Access**: Limited to assigned savers, deposit registration, and own collection history
- **Redirects to**: `/dashboard/overview`

### 3. Cliente (Ticante) User
- **Email**: `cliente@xitique.com`
- **Password**: `cliente123`
- **Role**: Saver/Client
- **Organization**: Xitique Central
- **Access**: Personal dashboard, deposits history, loans history, and profile
- **Redirects to**: `/client/dashboard`

## 📝 Notes

- All passwords are set to `[role]123` for easy testing
- The authentication is currently mocked in `src/contexts/AuthContext.tsx`
- Users are persisted in localStorage for session management
- To logout, click the "Sair" button in the header or client layout

## 🔒 For Production

Replace the mock authentication in `AuthContext.tsx` with:
- Real API calls to your backend
- JWT token-based authentication
- Secure password hashing
- Session management with refresh tokens
