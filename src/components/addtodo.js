import React from 'react';

class AddTodo extends React.Component {

    constructor() {
        super();
        this.state = {
            todo: ''
        };
    }

    render() {
        return(
        <div className='AddToDo container'> 
            <form onSubmit={(e) => this.submitTodo(e)}>
                <input id ='addTodoInput' onChange={(e) => this.updateInput(e)} type='text'></input>
                <button id ='addTodoButton' type="submit"> Add To Do </button>
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