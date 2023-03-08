import './App.css';
import {BrowserRouter as Router , Routes,Route} from "react-router-dom";

import Join from "./compoenents/join/Join.jsx";
import Chat from './compoenents/chat/Chat';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Join/>} />
          <Route exact path='/chat' element={<Chat/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
