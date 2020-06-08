import React from 'react'
import { Button, Form, FormControl, Col, Row } from 'react-bootstrap'
import {List} from 'immutable'
import { getServerContext } from "@labkey/api";
import "./todolist.scss";

interface Item {
    name: string
    text: string
    isComplete: boolean
}

interface State {
    todoList: List<Item>
    value?: string
}

export class App extends React.Component<any, State> {

    constructor(props)
    {
        super(props);

        this.state = {
            todoList: List<Item>()
        };
    }

    onTextChange = (evt) => {
        // stash the value in state for easy access when adding
        const value = evt.target.value;
        this.setState(() => ({value}));
    };

    addItem = () => {
        this.setState((state) => {
            const name = 'Item #' + (state.todoList.size + 1);
            const text = state.value;

            return {
                todoList: state.todoList.push({
                    name,
                    text,
                    isComplete: false
                })
            }
        });
    };

    clearAll = () => {
        this.setState(() => ({
            todoList: List<Item>()
        }));
    };

    onItemClick(index: number) {
        const { todoList } = this.state;
        let item = todoList.get(index);

        if (!item.isComplete) {
            item.isComplete = true;

            this.setState(() => ({
                todoList: todoList.set(index, item)
            }));
        }
    }

    renderItemEntryPanel() {
        return (
            <div />
            // <Panel className={'panel-primary'}>
            //     <Panel.Heading>
            //         Create New To-Do List Items
            //     </Panel.Heading>
            //     <Panel.Body>
            //         <Form>
            //             <Row>
            //                 <Col xs={6}>
            //                     <FormControl
            //                         id={'item-text'}
            //                         type="text"
            //                         placeholder={'Enter a text for your to-do list item'}
            //                         onChange={this.onTextChange}
            //                     />
            //                 </Col>
            //                 <Col xs={6}>
            //                     <Button className={'labkey-button primary'} onClick={this.addItem}>Add Item</Button>
            //                     <Button onClick={this.clearAll} style={{marginLeft: '10px'}}>Clear All</Button>
            //                 </Col>
            //             </Row>
            //         </Form>
            //     </Panel.Body>
            // </Panel>
        )
    }

    renderToDoListPanel() {
        const { todoList } = this.state;

        return (
            <div />
            // <Panel>
            //     <Panel.Heading>
            //         To-Do List for {getServerContext().user.displayName}
            //     </Panel.Heading>
            //     <Panel.Body>
            //         <p>
            //             Click on a To-Do list item to mark is as complete.
            //         </p>
            //         <ul>
            //             {todoList.map((item, i) => {
            //                 const cls = item.isComplete ? ' todolist-complete-item' : 'todolist-incomplete-item';
            //
            //                 return (
            //                     <li className={cls} key={i} onClick={() => this.onItemClick(i)}>
            //                         {item.name}: {item.text}
            //                     </li>
            //                 )
            //             })}
            //         </ul>
            //     </Panel.Body>
            // </Panel>
        )
    }

    render() {
        const { todoList } = this.state;

        return (
            <>
                {this.renderItemEntryPanel()}
                {todoList.size > 0 && this.renderToDoListPanel()}
            </>
        )
    }
}
