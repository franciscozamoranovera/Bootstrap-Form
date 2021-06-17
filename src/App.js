import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import Navbar from './components/Navbar';
import Table from './components/tables/Table';
import Swal from 'sweetalert2';

const App = () => {

  const [taskId, setTaskId] = useState(null); // We create an id's state as a way to identify if we're in Edit or Create State.

  const [inputForm, setInputForm] = useState({ //State that represent the edition and creation of the tasks.
    responsible: "",
    description: ""
  });

  const [taskState, setTaskState] = useState([
    { id: 1, responsible: "Francisco", description: "Crear formulario" } // array de objetos dentro del useState.
  ]);

  useEffect(() => {
    const selected = taskState.filter(taskSelected => taskSelected.id === taskId) //taskSelected only lives here, in the filter (scope)
    taskId && setInputForm(selected[0])
  }, [taskId, taskState]) 
  // En el Array van las variables que queremos que detecte para ser ejecutado el useEffect, es decir, el useEffect se va a ejecutar cada vez que los elementos del array se modifiquen.
  // taskId

  const createId = () => {

    if (taskState.length <= 0) {
      return 0 //Id will always start in "1", because we added in createTask > createId () + "1". WHY DO WE USE RETURN HERE?

    }; //IF statement created to start the table in Id = 1. Otherwise, the ID will end up return "infinity". Try adding up the IF Statement before and after the MAP method.

    const ids = taskState.map((task) => {
      return task.id
    });

    return Math.max(...ids) // Return the maximum ID number looked up by MAP, this allow us to create new ID's using this: "const id = createId () +1".

  };


  /* --- TABLE STATES --- */

  const createTask = () => {
    const id = createId() + 1; /* Adding "+1" in createId, we   */
    setTaskState([...taskState, { id, ...inputForm }]); /* using the spread operator, we create an Array clone in order to create a new one */

  };

  const editTask = id => { /* WHY do we use an ID here? */
    const index = taskState.findIndex(taskState => taskState.id === id); /* Find index: method used to find the position of the array (task) we want to edit */
    const clone = [...taskState]; /* Here, we create a clone (using the spread operator) of the task we want to edit, we DO NOT edit the original task */
    clone.splice(index, 1); /* Now, we use the clone and apply to it the Slice method to remove the information cloned and then add the new information */
  };

  const resetForm = () => {
    setInputForm({
      responsible: "",
      description: ""
    })
    setTaskId(null);
  }

  /* --- BUTTON FORM STATES --- */

  const handleSubmit = (e) => {
    e.preventDefault(); /* This prevents that our page resets */

    taskId !== null ? editTask(taskId) : createTask(); // Condición que hace el pase al modo de edición, usando la detección de ID. Se conecta con el useState.

    if (inputForm.responsible.length < 3) { /* Number of characters allowed (a minimun of characters for "Responsable" in this line) */

      Swal.fire({

        icon: 'error',
        title: 'Oops...',
        text: 'Tu nombre debe contener más de 3 letras',
      })

    } else if (inputForm.description.length < 3) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La descripción debe contener más de 3 letras',
      })

    } else {

      Swal.fire({
        icon: 'success',
        title: 'Tarea registrada',
        text: JSON.stringify(inputForm, null, 3), /* A way to display the information in JSON */
      })

    }
  };
  const handleChange = (e) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value }) /* Spread operator creates an independent clone for inputs in the Form */

  };


  return (
    <>
      <Navbar />
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <Form
                handleSubmit={handleSubmit} /* Props */
                handleChange={handleChange} /* Props */
                inputForm={inputForm} /* Props */
                resetForm={resetForm}/* Props */
             
              />
            </div>

            <div className="col-12 col-md-8">
              <Table
                taskState={taskState} /* Props */
                setTaskState={setTaskState} /* Props */
                setTaskId={setTaskId}/* Props */
                taskId={taskId}/* Props */
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
