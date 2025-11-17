"use client";

/*
 * Higher-Order Component (HOC) for authentication in Next.js.
 *
 * Usage:
 *   export default withAuth(DashboardPage);
 *
 * Description: 
 * 1. Checks if a valid token exists in cookies + Redux store state (user).
 * 2. If user is not authenticated:
 *    - Dispatches logout action to clear Redux state.
 *    - Updates localStorage session values (clears login type, resets session id).
 *    - Redirects the user to the login page.
 * 3. If authenticated, renders the wrapped component.

 */

import { ComponentType, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useAppDispatch, useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { useRouter } from 'next/navigation';
import { userLogoutSuccess } from '@/data-handling/store/slices/user-slice';
import { CLIENT_ENDPOINTS } from '@/data-handling/endpoints/client-endpoints';

export default function withAuth(WrappedComponent: ComponentType<any>) {
  return function AuthComponent(props: any) {
    // Read authentication token from cookies
    const token = getCookie('auth_token');

    const dispatch = useAppDispatch();
    const router = useRouter();

    // Extract user authentication state from Redux
    const { currentUser, isAuthenticated } = useAppSelector((store) => store?.user);

    // User is considered logged in only if all three checks pass
    const isLoggedIn = isAuthenticated && currentUser && token;

    useEffect(() => {
      // If user is not logged in or token missing, enforce logout & redirect
      if (!isLoggedIn || !token) {
        dispatch(userLogoutSuccess());

        // Store new session id & clear login type
        localStorage.setItem("poly_erp_session_id", Date.now().toString());
        localStorage.removeItem("poly_erp_login_type");

        // Redirect to login page
        router.push(CLIENT_ENDPOINTS?.LOGIN);
      }
    }, [token, isLoggedIn, dispatch, router]);

    // Render wrapped component only if user is logged in
    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };
}
