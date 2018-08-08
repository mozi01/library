import * as React from 'react'
/* import Axios from 'axios' */
import Ajax from '../../utils/Ajax'

interface IProps {
  test?: any
}

interface IState {
  info?: any
}
export default class AxiosTest1 extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      info : []
    }
  }

  componentDidMount() {
    /* const i = Math.floor(Math.random() * 9)  */
    Ajax.get('gank/api/xiandu/categories', {}).then((res: any) => {
      if (res!.results!.length > 0 ) {
         this.setState({
           info: res.results
         }) 
      }
    })
  }
  render() {
    return(
      <div>
        <div>获取到的名称为：
          { this.state.info && this.state.info.map(item => {
           return <div key={item._id}> {item.en_name} </div>
          })}
        </div>
      </div>
    )
  }
} 