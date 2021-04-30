import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
    render() {
        const { todos } = this.props;

        const completed = todos.filter(function(value) {
            return value.completed === true;
        });

        const notcompleted = todos.filter(function(value) {
            return value.completed === false;
        });

        return(
        <>
        <div className='CompletedContainer'> 
            {
                notcompleted.map((_todo, _index) => {
                    return(
                        <TodoItem updateTodoFn={this.updateTodo} key={_index} todo={_todo}></TodoItem>
                    )
                })
            }
        </div>
        {(completed.length > 0 ? <hr></hr> : '')}
        <div className='NotCompletedContainer'>
            {
                completed.map((_todo, _index) => {
                    return(
                        <TodoItem updateTodoFn={this.updateTodo} key={_index} todo={_todo}></TodoItem>
                    )
                })
            }
        </div>
        </>
        );
    }

    updateTodo = (todo) => {
        this.props.updateTodoFn(todo); 
    }
}

export default TodoList;