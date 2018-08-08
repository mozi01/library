import * as React from 'react'
import MyWebSocket from '../../components/WebSocket' 

interface IProps {
  test? : any
}

interface IState {
  summitMessage : string,
  webMessage : string 
}

export default class Chat extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      summitMessage : '',
      webMessage : ''
    }
    this.recieveFromSummit = this.recieveFromSummit.bind(this)
    this.recieveFromWeb = this.recieveFromWeb.bind(this)
  }

  recieveFromSummit(content: any) {
    this.setState({
      summitMessage : content
    }, () => {
      console.log('父容器接收到的消息为：' + content)
    })
  }

  recieveFromWeb(content: any) {
    this.setState({
      webMessage : content
    }, () => {
      console.log('父容器接收到的消息为：' + content)
    })
  }
 

  render() {
    return(
      <div>
        <MyWebSocket message = {this.state.webMessage} send= {this.recieveFromSummit} />
        <MyWebSocket message = {this.state.summitMessage} send= {this.recieveFromWeb} />
      </div>
    )
  }
}