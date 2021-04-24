import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const icon_complete = <FontAwesomeIcon icon={faCheck} />;
const icon_delete = <FontAwesomeIcon icon= {faTrash} />;

class TodoItem extends React.Component {
    
    render() {

        const { todo } = this.props;
        console.log(todo);

        return(
        <>
        <div className={'TodoItem' + (todo.completed ? ' completed': '')}> 
            {todo.text}
            <button class ="btncomplete" onClick={this.toggleTodo}> 
                { icon_complete }
            </button>
            <button class ="btndelete" onClick={this.deleteTodo}> 
                { icon_delete }
            </button>
        </div>
        </>
        );
    }

    toggleTodo = () => {
        this.props.updateTodoFn(this.props.todo);
    }

    deleteTodo = () => {
        this.props.todo.text = '';
        this.props.updateTodoFn(this.props.todo);
        console.log(this.props.todo);
    }
}

export default TodoItem;