import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useAction } from './store/hooks/useAction';
import './styles/app.scss';
import { useEffect } from 'react';

function App() {

  const { getData } = useAction();

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='app'>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
