import * as React from 'react'
import {Button} from 'antd'

interface IProps {
  outMessage?: any
  operate?: (message?: any) => void
}

interface IState {
  message? : string
}
export default class Switch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      message : '开启'
    }
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick() {
    if (this.state.message === '开启') {
      this.setState({
        message : '关闭'
      })
    } else {
      this.setState({
        message : '开启'
      })
    }
    if (this.props.operate) {
      this.props.operate(this.state.message)
    }
  }

  /* componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.outMessage !== this.props.outMessage) {
      this.setState({
        message : nextProps.outMessage
      })
    }
  } */

  render() {
    return (
      <div>
        <Button onClick= {this.handleClick}/>
        <div>开关状态为：{this.state.message}</div>
      </div>
    )
  }
}