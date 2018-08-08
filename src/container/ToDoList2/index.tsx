import * as React from 'react'
import InputItem, {Item as GZR} from '../../components/InputItem'
import Item from '../../components/Item'
interface IProps {
  test: any
}

interface IState {
  items: GZR[] // Array<GZR>
}

export default class ToDoList extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      items: [
        { id: '1', checked: false, content: '吃饭' },
        { id: '2', checked: true, content: '睡觉' },
        { id: '3', checked: false, content: '打豆豆' }
      ]
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleAdd(content: any) {
    const itemArray = this.state.items
    itemArray.push(content)
    this.setState({
      items: itemArray
    }, () => {
      console.log('父容器收到的值：')
      console.dir(content)
    })
  }

  handleDelete(key: any) {
    console.log('要删除的键为:' + key)
    const itemArray = this.state.items
    itemArray.map(item => {
      if (item.id === key) {
        const index = itemArray.indexOf(item)
        if (index > -1) {
          itemArray.splice(index, 1)
        }
      }
    })
    this.setState({
      items: itemArray
    })
  }

  render() {
    return (

      <div style={{ width: '300px' }}>
        <h1 style={{ textAlign: 'center' }}>TODOLIST2</h1>
        {this.state.items.map(item => {
          const mycolor = item.checked ? '#98FB98' : '#C0FF3E'
          const colorStyle = {
            backgroundColor: mycolor
          }
          return (
            <div key={item.id} style={colorStyle}>
              <Item inputItem={item} delete={this.handleDelete} />
            </div>
          )
        })
        }
        <InputItem input={this.handleAdd} />
      </div>
    )
  }
}