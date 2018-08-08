import * as React from 'react'
import { Button, Input } from 'antd'

interface IProps {
  test?: any
  input?: (content?: any) => void
}
export interface Item {
  id: string,
  checked: boolean,
  content: string
}
interface IState {
  item: any
}

export default class InputItem extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      item: {
        id: '',
        checked: false,
        content: ''
      }
    }
    this.getValue = this.getValue.bind(this)
    this.save = this.save.bind(this)
  }

  getValue(evt) {
    if (evt.target.value) {
      const array = evt.target.value.split(',')
      this.setState({
        item: {
          id: array[0],
          checked: false,
          content: array[1]
        }
      })
    }
  }

  save() {
    if (this.props.input) {
      this.props.input(this.state.item)
    }
  }


  render() {
    return (
      <div>
        <label style={{ float: 'left' }}>请输入任务：</label>
        <Input style={{ float: 'left', width: '150px' }} onChange={this.getValue} />
        <Button onClick={this.save}>保存</Button>
      </div>
    )
  }
}