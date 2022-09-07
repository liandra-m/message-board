import logo from './logo.svg';
import './App.css';

import Messages from './components/Messages';
import { MessageProvider } from './contexts/messages';
import AddMessage from './components/Messages/AddMessage';

function App() {
  return (
    <MessageProvider>
      <div className='App'>
        <AddMessage />
        <Messages />
      </div>
    </MessageProvider>
  );
}

export default App;
