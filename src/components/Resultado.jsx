const Resultado = ({ tareas, setTarea, eliminandoTarea }) => {


  const handleEliminar = (id) => {

    const respuesta = confirm("Desea eliminar la tarea??")
    if(respuesta) {
      //console.log('desde resultaod', id)
      eliminandoTarea(id)
    }

  } 

  return (
    <div>
      {tareas && tareas.length ? (
        <>
          {
            tareas.map((tareaa) => (
              <div key={tareaa.id}>
                <div className="tareas">
                  <p><span>Nombre:</span> {tareaa.nombre}</p>
                  <p><span>descripcion:</span> {tareaa.descripcion}</p>
                  <p>
                    <button
                      type='button'
                      className='btn'
                      onClick={() => setTarea(tareaa)} // estaba mandando tarea q antes venia por props y lo q tenia q enviar era tarea q es lo q recorre el map
                    >
                      Editar
                    </button> 
                    
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleEliminar(tareaa.id)}
                    >
                      Eliminar
                    </button>
                  </p>
                  <hr />
                </div>
              </div>
            ))
          }
        </>
      ) : (
        <div>
          <p>No hay tareas disponibles</p>
        </div>
      )}
    </div>
  )
}

export default Resultado