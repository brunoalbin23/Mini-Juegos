import { useState, useEffect } from 'react';
import { Element } from './components/Element';
import stone from './assets/stone.png';
import scissor from './assets/scissor.png';
import paper from './assets/tissue-roll.png';

function App() {
  const [userOption, setUserOption] = useState(null);  // Opción seleccionada por el usuario
  const [machineOption, setMachineOption] = useState(null);  // Opción seleccionada por la máquina
  const [isGameActive, setIsGameActive] = useState(false);  // Estado para activar el juego
  const [countdown, setCountdown] = useState(5);  // Contador para el temporizador
  const [result, setResult] = useState('');  // Resultado del juego (quién ganó)

  const handleUserSelect = (id) => {
    setUserOption(id);
    setIsGameActive(true); // Inicia el juego cuando se selecciona una opción
    setResult(''); // Limpia el resultado anterior
  };

  const getOptionImage = (id) => {
    if (id === 1) return stone;
    if (id === 2) return scissor;
    if (id === 3) return paper;
    return null;
  };

  const determineWinner = () => {
    console.log('userOption:', userOption);
    console.log('mach:', machineOption);
    if (userOption === machineOption) {
      setResult('Es un empate');
    } else if (
      (userOption === 4 && machineOption === 2) ||  // Piedra vence a Tijera
      (userOption === 5 && machineOption === 3) ||  // Tijera vence a Papel
      (userOption === 6 && machineOption === 1)     // Papel vence a Piedra
    ) {
      setResult('¡Ganaste!');
    } else {
      setResult('¡Perdiste!');
    }
  };
  

  useEffect(() => {
    if (isGameActive && userOption !== null) {
      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownTimer);
            
            // Selección aleatoria de la máquina después de que termine el contador
            const randomChoice = Math.floor(Math.random() * 3) + 1;
            setMachineOption(randomChoice);  // Asigna la opción aleatoria
  
            // Espera a que machineOption tenga un valor para determinar el ganador
            setTimeout(() => {
              determineWinner();
            }, 100); // Pequeña demora para asegurar que la máquina haya seleccionado su opción
            
          }
          return prevCountdown - 1;
        });
      }, 1000);
  
      return () => clearInterval(countdownTimer);
    }
  }, [isGameActive, userOption]);
  
  

  const resetGame = () => {
    setUserOption(null);
    setMachineOption(null);
    setIsGameActive(false);
    setCountdown(5);
    setResult('');
  };

  return (
    <>
      <header></header>

      <main>
        <h1 className='title permanent-marker'>PIEDRA PAPEL O TIJERA</h1>
        <section>
          <div className='option-machine letter-hidden'>
            <Element id="1" className={`element machine ${machineOption === 1 ? 'active' : ''}`}>
              <img className="img" src={getOptionImage(1)} alt="Piedra" />
            </Element>
            <Element id="2" className={`element machine ${machineOption === 2 ? 'active' : ''}`}>
              <img className="img" src={getOptionImage(2)} alt="Tijera" />
            </Element>
            <Element id="3" className={`element machine ${machineOption === 3 ? 'active' : ''}`}>
              <img className="img" src={getOptionImage(3)} alt="Papel" />
            </Element>
          </div>

          <div className='timer permanent-marker'>
            {result ? (
              <div className="result-container">
                <span>{result}</span>
                <button onClick={resetGame}>Jugar de nuevo</button>
              </div>
            ) : (
              `Eligiendo... ${countdown}`
            )}
          </div>

          <div className='option-user letter-hidden'>
            <Element id="4" className="element user" setOption={handleUserSelect} userOption={userOption}>
              <img className="img" src={stone} alt="Piedra" />
            </Element>
            <Element id="5" className="element user" setOption={handleUserSelect} userOption={userOption}>
              <img className="img" src={scissor} alt="Tijera" />
            </Element>
            <Element id="6" className="element user" setOption={handleUserSelect} userOption={userOption}>
              <img className="img" src={paper} alt="Papel" />
            </Element>
          </div>
        </section>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
