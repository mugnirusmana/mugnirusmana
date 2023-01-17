import { AnimatePresence } from "framer-motion";

import './App.css';
import Routes from './routes';

function App() {
  return (
    <AnimatePresence mode='wait'>
      <Routes />
    </AnimatePresence>
  )
}

export default App;
