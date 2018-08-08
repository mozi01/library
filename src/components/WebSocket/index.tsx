import * as React from 'react'

interface IProps {
  message?: string // 通过属性传递进来的消息
  send?: (content?: string) => void // 定义的给父组件传值的函数
}

interface IState {
  recieveMessage? : string // 接收到的消息
  sendMessage?: string // 要发送出去的消息
}

export default class MyWebSocket extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      sendMessage : ''
    }
    this.getValue = this.getValue.bind(this)
    this.send = this.send.bind(this)
  }

  getValue(evt) {
    if (evt.target.value) {
      this.setState({
        sendMessage: evt.target.value
      })
    }
  }

  send() {
    if (this.props.send) {
      this.props.send(this.state.sendMessage)
    }
  }
  
  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.message !== this.props.message) {
        this.setState({
          recieveMessage : nextProps.message
        })
    }
  }

  render() {
    return (
      <div>
        <div>接收到的消息：{this.state.recieveMessage}</div>
        <input onChange = {this.getValue} />
        <button onClick = {this.send}>发送</button>
      </div>
    )
  }
}