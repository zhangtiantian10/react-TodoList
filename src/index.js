import React, {Component} from 'react';
import {render} from 'react-dom';
import main from './count';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class ModifyTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: !this.props.checked.static,
            todoLists: this.props.children
        }
    }

    handleChange(e) {
        this.setState({
            complete: !this.state.complete
        });
        this.setState({
            todoLists: main.modifyTodolist(this.props.children, this.state.complete, this.props.index)
        });

        this.props.callbackParent(this.state.todoLists);
    }

    handleTodo(e) {

        if (this.state.complete) {
            return <s>{this.props.checked.value}</s>;
        } else {
            return this.props.checked.value;
        }
    }

    handleDelete(e) {
        this.setState({
            todoLists: main.deleteCompleteThing(this.props.children, this.props.index)
        });

        this.props.callbackParent(this.state.todoLists);
    }

    render() {
        return (
            <div>
                <li className="list-group-item">
                    <input type="checkbox" checked={this.state.complete}
                           onClick={this.handleChange.bind(this)} value=""/>
                    {this.handleTodo()}
                    <button type="button" className="btn btn-default btn-xs" onClick={this.handleDelete.bind(this)}>
                                                <span className="glyphicon glyphicon-remove-sign"
                                                      aria-hidden="true"></span>
                    </button>
                </li>
            </div>
        )
    }
}
;

class InsertTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoLists: [],
            complete: false
        }
    }

    increment() {
        this.setState({
            todoLists: main.getTosoLists(this.state.todoLists, document.getElementById('text1').value)
        });
    }

    handlerKeyUp(e) {
        if (e.keyCode == 13) {
            let value = e.target.value;
            if (!value) return false;

            this.increment();
            document.getElementById('text1').value = '';
        }
    }

    modifyTodo(newTodeLists) {
        this.setState({
            todoLists: newTodeLists
        });
    }

    render() {
        return (
            <div className="col-xs-4">

                <input type="text" className="form-control" placeholder="What do you want to do?" id="text1"
                       onKeyDown={this.handlerKeyUp.bind(this)}/>

                <ul className="list-group">
                    {this.state.todoLists.map((list, index) => {
                        return (
                            <ModifyTodo index={index} checked={list} callbackParent={this.modifyTodo.bind(this)}>
                                {this.state.todoLists}
                            </ModifyTodo>)
                    })}
                    <li className="list-group-item">
                        <small>{main.getTodoThings(this.state.todoLists)} items left</small>
                    </li>
                </ul>
            </div>
        );
    }
}
;

render(<InsertTodo/>
    , document.getElementById('root'));


