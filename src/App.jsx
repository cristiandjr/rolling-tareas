import { useState, useEffect } from "react";
import Resultado from "./components/Resultado";

function App() {
  const tareasLS = JSON.parse(localStorage.getItem("tareasRC")) ?? [];

  // variable - func. modificadora = valor inicial
  const [tareas, setTareas] = useState(tareasLS);
  const [tarea, setTarea] = useState({});

  // valores del form
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // error
  //const [error, setError] = useState(false)

  // LC
  useEffect(() => {
    localStorage.setItem("tareasRC", JSON.stringify(tareas));
  }, [tareas]);

  // generamos ID dinamico
  const generoIdDinamico = () => {
    const ran = Math.random();
    const fecha = Date.now();
    return ran + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, descripcion].includes("")) {
      console.log("el campo debe estar completo");
      return;
    }

    //console.log('Si el form esta completo, sigo')
    const objetoTareas = {
      nombre,
      descripcion,
    };


    if (tarea.id) {
      
      // PUT, editamos la tarea por ID
      objetoTareas.id = tarea.id;

      const tareasActualizadas = tareas.map((tareasState) => {
        return tareasState.id === tarea.id ? objetoTareas : tareasState;
      });

      setTareas(tareasActualizadas);
      setTarea({});
    } else {
      // POST, creamos la tarea nueva
      //console.log('tarea nueva')

      objetoTareas.id = generoIdDinamico();
      setTareas([...tareas, objetoTareas]);
    }


  };

  return (
    <>
      <header>
        <h1>
          Completa tu dia con <span>Rolling Tareas</span>
        </h1>
      </header>
      <main className="contenedor">
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="formulario-input">
            <label htmlFor="nombre">Nombre de tarea</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="formulario-input">
            <label htmlFor="descripcion">Descripcion</label>
            <textarea
              name="descripcion"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <input
              type="submit"
              className="btn"
              value={tarea.id ? "Editar " : "Agregar "}
            />
        </form>
        <section className="resultado">
          <Resultado 
            tareas={tareas} 
            tarea={tarea} 
            setTarea={setTarea} 
          />
        </section>
      </main>
    </>
  );
}

export default App;
