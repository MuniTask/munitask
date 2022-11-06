import './styles/styles.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation';
import FooterBottom from './components/FooterBottom';
import Home from './views/Home';
import About from './views/About';
import HowItWorks from './views/HowItWorks';
import FAQs from './views/FAQs';
import JobView from './views/JobView';
import Test from './views/Test';
import AddToDb from './views/AddToDb';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className='content-wrap'>
     <BrowserRouter >
     <Routes>

      <Route path='/' element={<Home />}/>
      <Route path='/:jobTitle' element={<JobView />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/howitworks' element={<HowItWorks />}/>
      <Route path='/faqs' element={<FAQs />}/>
      <Route path='/test' element={<Test />}/>
      <Route path='/addtodb' element={<AddToDb />}/>

     </Routes>
     
     </BrowserRouter>
     </div>
     <FooterBottom className='footer'/>
     </div>
   
  );
}

export default App;
