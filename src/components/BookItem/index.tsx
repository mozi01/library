import * as React from 'react'
import { Button } from 'antd'

interface IState {
  test?: any
}

interface IProps {
  inputItem?: any
  delete?: (key: string) => void
} 

export default class BookItem extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete() {
    if (this.props.delete) {
      this.props.delete(this.props.inputItem.id)
    }
  }

  render() {
    return(
      <div>
        <div style={{float: 'left', width : '150px'}}>{this.props.inputItem._id}</div>
        <div style={{float: 'left', width : '150px'}}>{this.props.inputItem.name}</div>
        <div style={{float: 'left', width : '150px'}}>{this.props.inputItem.content}</div>
        <Button onClick={this.delete}> {'删除'}</Button>
      </div>

    )
  }
}