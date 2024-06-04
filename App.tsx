import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message'

import { toastConfig } from './src/utils/toastConfig'
import BaseRoutes from './src/Navigation/BaseRoutes';

const App = () => {

  return (
    <SafeAreaProvider>
      <BaseRoutes />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
};

export default App;
