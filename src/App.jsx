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

  // useEffect es una herramienta que te permite "escuchar" cambios en ciertas dependencias y ejecutar codigo en respuesta a esos cambios.
  // LC
  useEffect(() => {
    localStorage.setItem("tareasRC", JSON.stringify(tareas));
  }, [tareas]);

  // cuando cambia el obj tarea (osea mi dependencia)
  useEffect(() => {
    // carga un obj vacio xq esta esperando q le enviemos una tarea
    // comprueba si un arr esta vacio y si es mayor a 0 y si tiene algo devuelve TRUE
    if(Object.keys(tarea).length > 0) {
      setNombre(tarea.nombre)
      setDescripcion(tarea.descripcion)
    } else {
      console.log('No nada en el arr de tarea')
    }
  }, [tarea])


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
      // PATCH, editamos la tarea por ID
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

    // reinicio form
    setNombre("");
    setDescripcion("");
  };


  //
  const eliminandoTarea = (id) => {
    //console.log('desde app', id)

    // retorna un objeto nuevo. Sacamos un elemento del arr diferente al id q paso como parametro a la func.
    const tareaActualizados = tareas.filter((tareaState) => tareaState.id !== id);
    setTareas(tareaActualizados);
  }



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
            setTarea={setTarea}
            eliminandoTarea={eliminandoTarea}
          />
        </section>
      </main>
    </>
  );
}

export default App;
