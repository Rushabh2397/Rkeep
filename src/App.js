import './App.css';
import Navbar from './components/navabar/Navbar'
 import NewNote from './components/notes/NewNote'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <NewNote/>
    </div>
  );
}

export default App;
