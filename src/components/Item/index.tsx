import * as React from 'react'
import {Checkbox, Button} from 'antd'

interface IState {
  checked: boolean
}

interface IProps {
  inputItem?: any
  delete?: (key: string) => void
} 

export default class Item extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      checked : this.props.inputItem.checked
    }
    this.delete = this.delete.bind(this)
    this.changeChecked = this.changeChecked.bind(this)
  }

  delete() {
    if (this.props.delete) {
      this.props.delete(this.props.inputItem.id)
    }
  }

  changeChecked() {
    const newChecked = !this.state.checked
    this.setState({
      checked : newChecked
    })
  } 

  render() {
    return(
      <div>
        <div style={{float: 'left', width: '220px', marginLeft: '15px'}}><Checkbox checked={this.state.checked} onChange={this.changeChecked} />{this.props.inputItem.content}</div><Button onClick={this.delete}> {'删除'}</Button>
      </div>

    )
  }
}