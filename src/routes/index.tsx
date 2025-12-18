import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageLoader from '@/components/PageLoader';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootRedirect from '@/routes/RootRedirect';

const Landing = lazy(() => import('@/pages/Landing'));
const Chat = lazy(() => import('@/pages/Chat'));
const ChatRoom = lazy(() => import('@/pages/ChatRoom'));
const Recording = lazy(() => import('@/pages/Recording'));
const Report = lazy(() => import('@/pages/Report'));
const OAuthCallback = lazy(() => import('@/pages/OAuthCallback'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route
        path="/landing"
        element={
          <Suspense fallback={<PageLoader />}>
            <Landing />
          </Suspense>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <Chat />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route element={<Layout />}>
        <Route
          path="/oauth/callback"
          element={
            <Suspense fallback={<PageLoader />}>
              <OAuthCallback />
            </Suspense>
          }
        />
        <Route
          path="/recording"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Recording />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatroom"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <ChatRoom />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Report />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
