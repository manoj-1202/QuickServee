

# Fix: White Screen - Supabase Client Initialization Error

## Problem

The website shows a white screen because the app crashes on startup with this error:

```
Error: supabaseUrl is required.
```

The Supabase client (`src/integrations/supabase/client.ts`) tries to read `VITE_SUPABASE_URL` from environment variables, but it comes back as `undefined`, causing `createClient()` to throw an unhandled error that kills the entire React app.

## Root Cause

The `.env` file contains the correct values, but they are not being injected into the preview runtime. Since both `.env` and `client.ts` are auto-generated files that we cannot edit, the fix is to add a **safety guard** in the app code so that a missing env variable doesn't crash everything.

## Solution

Add a defensive wrapper around the Supabase client import in `src/App.tsx` (or a new error boundary) so the app gracefully handles the case where Supabase fails to initialize, instead of showing a white screen.

### Changes

**1. Create `src/components/ErrorBoundary.tsx`**
- A React error boundary component that catches runtime errors
- Displays a friendly error message instead of a white screen
- Includes a "Reload" button for the user

**2. Update `src/App.tsx`**
- Wrap the app content with the new `ErrorBoundary` component
- This ensures any crash (including the Supabase init error) shows a user-friendly fallback UI

## Technical Details

### `src/components/ErrorBoundary.tsx`
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        // Friendly error UI with reload button
      );
    }
    return this.props.children;
  }
}
```

### `src/App.tsx`
- Import and wrap root content with `<ErrorBoundary>`

This will prevent the white screen issue and display a helpful message if the backend connection temporarily fails.

