import React, { Component } from 'react';
import {render} from 'react-dom';
import main from './count';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class ModifyTodo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            complete: this.props.checked
        }
    }
    handleChange(e) {
        this.setState({
            complete: !this.state.complete
        });
    }
    handleTodo() {
        if (this.state.complete) {
            return <s>{this.props.children}</s>;
        }
        else {
            return this.props.children;
        }
    }
    render() {
        return (
            <div>
                <li className="list-group-item">
                    <input type="checkbox" checked={this.state.complete}
                           onClick={this.handleChange.bind(this)} value=""/>
                    {this.handleTodo()}
                    <button type="button" className="btn btn-default btn-xs">
                                                <span className="glyphicon glyphicon-remove-sign"
                                                      aria-hidden="true"></span>
                    </button>
                </li>
            </div>
        )
    }
};

class InsertTodo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todoLists: [],
            complete: false
        }
    }
    increment(s, i) {
        if (s && i === -1) {
            this.setState({
                todoLists: main.getTosoLists(this.state.todoLists, document.getElementById('text1').value)
            });
        } else {
            this.setState({
                todoLists: main.modifyTodolist(this.state.todoLists, s, i)
            });
        }

    }
    handlerKeyUp(e) {
        if (e.keyCode == 13) {
            let value = e.target.value;
            if (!value) return false;

            this.increment(true, -1);
            document.getElementById('text1').value = '';
        }
    }
    handleChange(newComplete) {
        this.setState({
            complete: newComplete
        });
    }
    render() {
        return (
            <div className="col-xs-4">

                <input type="text" className="form-control" placeholder="What do you want to do?" id="text1"
                       onKeyDown={this.handlerKeyUp.bind(this)}/>

                <ul className="list-group">
                    {this.state.todoLists.map((count, index) => {
                        return <ModifyTodo index={index} checked={!count.static} callbackParent={this.handleChange}>
                            {count.value}
                        </ModifyTodo>
                    })}
                    <li className="list-group-item">
                        <small>{main.getTodoThings(this.state.todoLists)} items left</small>
                    </li>
                </ul>
            </div>
        );
    }
};

render(<InsertTodo/>
    , document.getElementById('root'));


