import { useState, useEffect } from 'react';
import { Element } from './components/Element';
import stone from './assets/stone.png';
import scissor from './assets/scissor.png';
import paper from './assets/tissue-roll.png';
import conffeti from 'canvas-confetti';

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
    const normalizedUserOption = userOption % 3 || 3; // Convierte 4 -> 1, 5 -> 2, 6 -> 3
  
    if (normalizedUserOption === machineOption) {
      setResult('Es un empate :/');
    } else if (
      (normalizedUserOption === 1 && machineOption === 2) || // Piedra vence a Tijera
      (normalizedUserOption === 2 && machineOption === 3) || // Tijera vence a Papel
      (normalizedUserOption === 3 && machineOption === 1)    // Papel vence a Piedra
    ) {
      setResult('¡Ganaste! :)');
      conffeti()
    } else {
      setResult('¡Perdiste! :(');
    }
  };

  useEffect(() => {
    console.log(result);
    if (isGameActive && userOption !== null) {
      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownTimer);
  
            // Selección aleatoria de la máquina
            const randomChoice = Math.floor(Math.random() * 3) + 1;
            setMachineOption(randomChoice); // Esto activará otro useEffect para determinar el ganador
          }
          return prevCountdown - 1;
        });
      }, 1000);
  
      return () => clearInterval(countdownTimer);
    }
  }, [isGameActive, userOption]);
  
  useEffect(() => {
    if (userOption !== null && machineOption !== null) {
      determineWinner();
    }
  }, [machineOption]); // Se ejecutará cuando machineOption cambie
  
  
  

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

          <div className='timer permanent-marker nashei'>
            {!userOption ? ( // Si el usuario no ha seleccionado una opción
              <span>Seleccione una opción</span>
            ) : result ? (
              <div className={`result-container ${result === 'Es un empate' ? 'neutral' : result === '¡Ganaste!' ? 'success' : 'failure'}`}>
                <span>{result}</span>
                <button onClick={resetGame}>Jugar de nuevo</button>
              </div>
            ) : (
              `Eligiendo... ${countdown}`
            )}
          </div>

          <div className='option-user letter-hidden'>
            <Element
              id="4"
              className={`element user ${isGameActive ? 'no-hover' : ''}`}
              setOption={handleUserSelect}
              userOption={userOption}
            >
              <img className="img" src={stone} alt="Piedra" />
            </Element>
            <Element
              id="5"
              className={`element user ${isGameActive ? 'no-hover' : ''}`}
              setOption={handleUserSelect}
              userOption={userOption}
            >
              <img className="img" src={scissor} alt="Tijera" />
            </Element>
            <Element
              id="6"
              className={`element user ${isGameActive ? 'no-hover' : ''}`}
              setOption={handleUserSelect}
              userOption={userOption}
            >
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
