import PropTypes from 'prop-types'; // BORRAR


const Resultado = ({ tarea, tareas, setTarea }) => {

  // BORRAR
  Resultado.propTypes = {
    tareas: PropTypes.array.isRequired,
    tarea: PropTypes.array.isRequired,
    setTarea: PropTypes.array.isRequired,
  };

  //console.log(tareas)

  return (
    <div>
      {tareas && tareas.length ? (
        <>
          {
            tareas.map((tareaa, index) => (
              <div key={index}>
                <div className="tareas">
                  <p><span>Nombre:</span> {tareaa.nombre}</p>
                  <p><span>descripcion:</span> {tareaa.descripcion}</p>
                  <p>
                    <button
                      type='button'
                      className='btn'
                      onClick={() => setTarea(tarea)}
                    >
                      Editar
                    </button> 
                    
                    <button>Eliminar</button>
                  </p>
                  <hr />
                </div>
                
              </div>
            ))
          }
        </>
      ) : (
        <>
          <p>No hay tareas disponibles</p>
        </>
      )}
    </div>
  )
}

export default Resultado