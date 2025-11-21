import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Chat from '@/pages/Chat';
import ChatRoom from '@/pages/ChatRoom';
import Landing from '@/pages/Landing';
import OAuthCallback from '@/pages/OAuthCallback';
import Recording from '@/pages/Recording';
import Report from '@/pages/Report';
import RootRedirect from '@/routes/RootRedirect';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/landing" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route
          path="/recording"
          element={
            <ProtectedRoute>
              <Recording />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatroom"
          element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
