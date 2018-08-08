import * as React from 'react'
import {Input, Button} from 'antd'

interface IState {
  test? : any
}

interface IProps {
  content? : any
}
class App2 extends React.Component<IProps, IState> {
  constructor(props : IProps, state : IState) {
    super(props)
    this.state = {
      test : ''
    }
    this.handleInput = this.handleInput.bind(this) // 未绑定到this时，此时无法调用this.setState方法
  }

  handleInput(event) {
    if (event.target.value) {
      this.setState(
        {
          test : event.target.value
        }
      ) 
    }
  }

  ButtonClickHandle (event) {
    alert('点击按钮')
  }

  render() {
    return(
      <div>
        <Input onChange= {this.handleInput}/>
        <Button onClick = {this.ButtonClickHandle} />
        <div>{this.state.test}</div>
      </div>
    )
  }

}

export default App2