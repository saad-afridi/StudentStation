import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const icon_add = <FontAwesomeIcon icon={faPlus} />;

class AddTodo extends React.Component {

    constructor() {
        super();
        this.state = {
            todo: ''
        };
    }

    render() {
        return(
        <div className='AddToDo'> 
            <form onSubmit={(e) => this.submitTodo(e)}>
                <input id ='addTodoInput' maxlength="50" onChange={(e) => this.updateInput(e)} type='text'></input> {}
                <button id ='addTodoButton' type="submit"> {icon_add} </button>
            </form>
        </div>
        )
    }

    updateInput = (e) => {
        this.setState({ todo: e.target.value });
    }

    submitTodo = (e) => {
        e.preventDefault();
        this.props.addToDoFn(this.state.todo);
        this.setState({ todo: ''});
        document.getElementById('addTodoInput').value = '';
    }
}

export default AddTodo;