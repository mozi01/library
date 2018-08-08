import * as React from 'react'
import CheckList from '../../components/CheckList'
import InputItem from '../../components/InputItem'

interface IProps {
  test?: any
}

interface IState {
  item: any
}

export default class ToDoList extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      item : {}
    }
    this.send = this.send.bind(this)
  }

  send(content : any) {
    this.setState ({
      item : content
    }, () => {
      console.dir('父容器收到的值：' + this.state.item)
    })
  }

  render() {
    return (
      <div style={{width: '300px'}}>
        <h1 style={{textAlign: 'center'}}>TODOLIST</h1>
        <CheckList inputItems={this.state.item}/>
        <InputItem input={this.send}/>
      </div>
    )
  }
}