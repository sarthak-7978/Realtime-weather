import { useState } from 'react';
import './App.css';
import Weather from './Component/Weather';


function App() {
  const [spinner, setspinner] = useState(true)
  const start = document.querySelector('.start')
  if (start) {
    setTimeout(() => {
      start.style.display="none";
      setspinner(false);
    }, 4000);
  }
  return (
    !spinner && (
    <div className="App">
    <Weather/>
    </div>
    )
  );
}

export default App;
