import './App.css';
import IngredientsCalculator from './components/IngredientsCalculator';
import KitchensOpenHeader from './components/KitchensOpenHeader';

function App() {
  return (
    <div className='App'>
      <KitchensOpenHeader />
      <IngredientsCalculator />
    </div>
  );
}

export default App;
