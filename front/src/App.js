import logo from './logo.svg';
import './App.css';

import Messages from './components/Messages';
import { MessageProvider } from './contexts/messages';
import { ChakraProvider } from '@chakra-ui/react'
import AddMessage from './components/Messages/AddMessage';

function App() {
  return (
    <MessageProvider>
      <ChakraProvider>
        <div className='App'>
          <AddMessage />
          <Messages />
        </div>
      </ChakraProvider>
    </MessageProvider>
  );
}

export default App;
