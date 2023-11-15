import { PaperProvider } from 'react-native-paper';
import Router from './routes/Router';
// import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      
        <Router />
        {/* <Toast /> */}
      
    </PaperProvider>
  );
  }