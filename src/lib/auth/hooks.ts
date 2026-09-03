/**
 * Better Auth hooks adapter layer
 *
 * This module provides hooks for authentication state management.
 */

/**
 * Hook for authentication status
 * Provides API for checking authentication state
 */
export function useAuth() {
  return {
    isLoaded: true,
    isSignedIn: false,
    userId: undefined,
    sessionId: undefined,
    getToken: async (): Promise<null> => null,
    error: null,
  };
}

/**
 * Hook for user information
 * Provides API for accessing user data
 */
export function useUser() {
  return {
    isLoaded: true,
    user: null,
    refetch: async () => undefined,
  };
}

/**
 * Hook to get the full session object
 */
export function useSession() {
  return { data: null, isPending: false, error: null, refetch: async () => undefined };
}
