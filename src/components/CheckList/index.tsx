import * as React from 'react'
import { Checkbox, Button } from 'antd'

interface IProps {
  inputItems?: any
}

interface IState {
  items: any
}
export default class CheckList extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      items: [
        {id: 1, checked: false, content: '吃饭'},
        {id: 2, checked: true, content: '睡觉'},
        {id: 3, checked: false, content: '打豆豆'}
      ]
    }
    this.delete = this.delete.bind(this)
  }

  delete() {
    alert('开始删除')
  }
  
  
  componentWillReceiveProps(nextProps: IProps) {
    const itemArray = this.state.items
    if (nextProps.inputItems !== this.props.inputItems) {
      itemArray.push(nextProps.inputItems)
      this.setState({
        items : itemArray
      })
    }
  }

  render() {
    return (
      
      <div style={{marginBottom: '15px'}}>
        {this.state.items.map (item => {
          const mycolor = item.checked ? '#98FB98' : '#C0FF3E'
          const colorStyle = {
            backgroundColor : mycolor
          }
          return (
            <div style={colorStyle}  key={item.id}><div style={{float: 'left', width: '220px', marginLeft: '15px'}}><Checkbox checked={item.checked}>{item.content }</Checkbox></div><Button onClick={this.delete}> {'删除'}</Button></div>
          )
         })
        }
      </div>
    )
  }
}