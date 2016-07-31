import React, {Component} from 'react';
import {render} from 'react-dom';
import main from './count';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class ModifyTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            todoLists: this.props.children,
        }
    }

    handleChange(e) {
        this.setState({
            complete: !this.state.complete
        });

        this.setState({
            todoLists: main.modifyTodolist(this.props.children ,this.props.checked)
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
            todoLists: main.deleteCompleteThing(this.props.children, this.props.checked),
            complete: !this.state.complete
        });

        this.props.callbackParent(this.state.todoLists);
    }

    jude(e) {
        if (this.props.flag === 0 || (this.props.flag === 1 && this.props.checked.static) || (this.props.flag === 2 && !this.props.checked.static)) {
            return (<li className="list-group-item">
                <input type="checkbox" checked={this.state.complete}
                       onClick={this.handleChange.bind(this)} value=""/>
                {this.handleTodo()}
                <button type="button" className="btn btn-link pull-right" onClick={this.handleDelete.bind(this)}>
                                                <span className="glyphicon glyphicon-remove-sign"
                                                      aria-hidden="true"></span>
                </button>
            </li>)
        }
    }

    render() {
        return (
            <div>
                {this.jude()}
            </div>
        );
    }
}

class InsertTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoLists: [],
            complete: false,
            flag: 0,
            index: 0
        }
    }

    increment() {
        this.setState({
            todoLists: main.getTosoLists(this.state.todoLists, document.getElementById('text1').value, this.state.index),
            index: this.state.index + 1
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

    modifyTodo(TodoLists) {
        this.setState({
            todoLists: TodoLists
        });
    }

    modifyNewTodo(flag) {

        if(flag === -1) {
            this.setState({
                todoLists: main.deleteAllComplete(this.state.todoLists)
            });
        } else{
            this.setState({
                flag: flag
            });
        }
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1 className="text-center">todos</h1>

                <input type="text" className="form-control input-lg" placeholder="What needs to be done?" id="text1"
                       onKeyDown={this.handlerKeyUp.bind(this)}/>

                <ul className="list-group">
                    {this.state.todoLists.map((list) => {
                        return (
                            <div>
                                <ModifyTodo index={list.index} checked={list} callbackParent={this.modifyTodo.bind(this)}
                                            flag={this.state.flag}>
                                    {this.state.todoLists}
                                </ModifyTodo>{list.static}</div>)
                    })}
                    <Footer callbackParent={this.modifyNewTodo.bind(this)}>{this.state.todoLists}</Footer>
                </ul>
            </div>
        );
    }
}

class Footer extends Component {
    showAll(e) {
        this.props.callbackParent(0);
    }

    showComplete(e) {
        this.props.callbackParent(2);
    }

    showTodo(e) {
        this.props.callbackParent(1);
    }

    clearComplete(e) {
        this.props.callbackParent(-1);
    }

    isShow() {
        if (this.props.children.length != 0) {
            return (
                <footer className="list-group-item">
                    <span>{main.getTodoThings(this.props.children)} items left</span>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-link" onClick={this.showAll.bind(this)}>All</button>
                        <button type="button" className="btn btn-link" onClick={this.showTodo.bind(this)}>Active
                        </button>
                        <button type="button" className="btn btn-link" onClick={this.showComplete.bind(this)}>Complete
                        </button>
                    </div>

                    <button type="button" className="btn btn-link pull-right" onClick={this.clearComplete.bind(this)}>Clear</button>
                </footer>
            );
        } else {

            return <h1></h1>;
        }
    }

    render() {
        return (
            this.isShow()
        )
    }
}

render(<InsertTodo/>
    , document.getElementById('root'));


