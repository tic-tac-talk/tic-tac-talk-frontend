import Modal from '@/components/Modal';
import AppProvider from '@/providers/AppProvider';
import AppRoutes from '@/routes';

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
      <Modal />
    </AppProvider>
  );
};

export default App;
