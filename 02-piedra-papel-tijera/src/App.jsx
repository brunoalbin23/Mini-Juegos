import './App.css'
import { Element } from './components/Element'

function App() {

  return (
    <>
      <header></header>

      <main>
        <h1 className='title permanent-marker'>PIEDRA PAPEL O TIJERA</h1>
        <section>
          <div className='option-machine letter-hidden'>
            <Element />
            <Element />
            <Element />
          </div>
          <div className='timer permanent-marker'>Selecciona una opción</div>
          <div className='option-user letter-hidden'>
            <Element />
            <Element />
            <Element />
          </div>
        </section>
      </main>
      
      <footer></footer>
      
    </>
  )
}

export default App
