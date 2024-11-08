import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactForm from './newUser'; // Adjust based on your file structure
import SuccessPage from './SuccessPage';  // Example success page
import MainPage from './MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/main" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
