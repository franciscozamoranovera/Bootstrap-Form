import React from 'react'
import { PenFill, XLg } from 'react-bootstrap-icons'

const Table = (props) => {

    const { taskState, setTaskState, taskId, setTaskId } = props;

    const deleteTask = id => {
        const newList = taskState.filter(task => task.id !== id); // to delete a task, we need to create a filter (method). 
        setTaskState(newList);
    }
    return (
        <>
            <div className="card">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Responsable</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskState.map((person) => {
                            return (
                                <tr key={person.id}> {/* we have to add a Key that works as an ID. This is a rule commnly used and needed */}
                                    <th scope="row">{person.id}</th>
                                    <td>{person.responsible}</td>
                                    <td>{person.description}</td>
                                    <td>
                                        <PenFill onClick={() => setTaskId(person.id)} color={(taskId && person.id === taskId) ? "green" : undefined}/> {/* setTaskId identify through person.id (MAP) the ID in the table by clicking the pencil, which at the same time identi */}
                                        <XLg onClick={() => deleteTask(person.id)} color="red" className={taskId && "d-none"}/>  {/* "d-none" hide elements */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
