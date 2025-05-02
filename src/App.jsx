
import './App.css';
import Footer from './components/Footer/Footer.jsx';
import Grid from './components/Grid/CardsGrid.jsx';
import Header from './components/Header/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Grid />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
