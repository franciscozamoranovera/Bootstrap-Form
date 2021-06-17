
import FormInput from './FormInput';

const Form = (props) => {

  const { handleSubmit, inputForm, handleChange, resetForm, taskId } = props;

  return (
    <>
      <div className="card mb-3 mb-md-0"  >
        <form className="card-body" onSubmit={handleSubmit} onReset={resetForm}>
          <h1>Formulario</h1>

          <FormInput
            htmlFor="nameInput"
            id="name"
            formLabel="Responsable"
            placeholder="Ej: Francisco Zamorano"
            value={inputForm.responsible} /* Se accede al objeto responsible con el punto */
            name="responsible"
            onChange={handleChange}

          />

          <FormInput
            htmlFor="taskInput"
            id="task"
            formLabel="Descripción"
            placeholder="Ej: Lavar los platos"
            value={inputForm.description} /* Se accede al objeto description con el punto */
            name="description"
            onChange={handleChange}

          />

          <div className="d-grid gap-2">
            <button type="submit" className={`btn ${taskId ? "btn-success" : "btn-primary"}`} >{`${taskId ? "Editar" : "Crear"} Tarea`}</button>  {/* Botón que renderiza de forma dinámica */}
            <button type="reset" text="Cancelar" className={`btn ${taskId ? "btn-danger" : "d-none"}`}>Cancelar</button>
          </div>
        </form>
      </div>

    </>
  )
}


export default Form;
