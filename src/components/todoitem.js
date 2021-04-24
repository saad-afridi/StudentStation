import React from 'react';

class TodoItem extends React.Component {
    render() {

        const { todo } = this.props;

        return(
        <>
        <div className={'TodoItem' + (todo.completed ? ' completed': '')}> 
            {todo.text}
            <i class="far fa-check-square"></i> 
            <button  pButton class ="complete" onClick={this.toggleTodo}> 
                <i class="far fa-check-square"></i> 
            </button>
        </div>
        </>
        );
    }

    toggleTodo = () => {
        this.props.updateTodoFn(this.props.todo);
    }
}

export default TodoItem;