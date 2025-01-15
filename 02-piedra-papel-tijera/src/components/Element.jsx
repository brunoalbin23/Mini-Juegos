export const Element = ({ id, children, className, setOption, userOption }) => {

    const handleClick = () => {
      // Llama a setOption para enviar el id al componente App
      setOption(id);
    }
  
    return (
        <div
        id={id}
        className={`${className} ${userOption === id ? 'selected' : ''}`}  // Añade la clase 'selected' cuando se elige
        onClick={handleClick}
      >
        {children}
      </div>
    );
  };
  