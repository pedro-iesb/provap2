import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Router from './routes/Router';

export default function App() {
  return (
    <PaperProvider>
      
        <Router />
      
    </PaperProvider>
  );
  }