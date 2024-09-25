import './App.css';
import Banner from './components/Banner';
import CarCategory from './components/CarCategory';
import Header from './components/Header';

function App() {
  return (
    <div>
    <Header/>
    <Banner/>
    <main><CarCategory/></main>
    </div>
  );
}

export default App;
