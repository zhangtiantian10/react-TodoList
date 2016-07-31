import React from 'react';
import {render} from 'react-dom';
import main from './count';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var ModifyTodo = React.createClass({
    getInitialState: function () {
        return {
            complete: this.props.checked
        }
    },
    handleChange: function () {
        this.setState({
            complete: !this.state.complete
        });
    },
    handleTodo: function () {
        if (this.state.complete) {
            return <s>{this.props.children}</s>;
        }
        else {
            return this.props.children;
        }
    },
    render: function () {
        return (
            <div>
                <li className="list-group-item">
                    <input type="checkbox" checked={this.state.complete}
                           onClick={this.handleChange} value=""/>
                    {this.handleTodo()}
                    <button type="button" className="btn btn-default btn-xs">
                                                <span className="glyphicon glyphicon-remove-sign"
                                                      aria-hidden="true"></span>
                    </button>
                </li>
            </div>
        )
    }
});

var InsertTodo = React.createClass({
    getInitialState: function () {
        return {
            count: [],
            complete: false
        }
    },
    increment: function (s, i) {
        if (s && i === -1) {
            this.setState({
                count: main.getCount(this.state.count, document.getElementById('text1').value)
            });
        } else {
            this.setState({
                count: main.modifyCount(this.state.count, s, i)
            });
        }

    },
    handlerKeyUp(e) {
        if (e.keyCode == 13) {
            let value = e.target.value;
            if (!value) return false;

            this.increment(true, -1);
        }
    },
    handleChange(newComplete) {
        this.setState({
            complete: newComplete
        });
    },
    render() {
        return (
            <div className="col-xs-4">

                <input type="text" className="form-control" placeholder="What do you want to do?" id="text1"
                       onKeyDown={this.handlerKeyUp.bind(this)}/>

                <ul className="list-group">
                    {this.state.count.map((count, index) => {
                        return <ModifyTodo index={index} checked={!count.static} callbackParent={this.handleChange}>
                            {count.value}
                        </ModifyTodo>
                    })}
                    <li className="list-group-item">
                        <small>{main.getTrueNumber(this.state.count)} items left</small>
                    </li>
                </ul>
            </div>
        );
    }
});

render(<InsertTodo/>
    , document.getElementById('root'));


