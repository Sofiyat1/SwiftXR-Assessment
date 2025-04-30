import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; //for routing
import Home from './pages/Home'; //Import the component Home
import Editor from './pages/Editor'; //import the component Editor


function App() {  
  return (
    <Router basename='/SwiftXR-Assessment/'> {/* Wraps the entire app enabling client-side routing */}
    <Routes> {/* Defines our route */}
      <Route path="/" element={<Home />} /> 
      <Route path="/editor" element={<Editor />} /> {/* define URL paths and the component to be shown there*/}
    </Routes>
  </Router>
  );
}



export default App;
