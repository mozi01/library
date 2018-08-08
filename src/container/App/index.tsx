import * as React from 'react'
import { Button } from 'antd'
import './App.scss'
// import logo from './logo.svg'
import MaptalksCom from '../../components/mapComponents/MaptalksCom'
import Summit from '../../components/Summit'
import Web from '../../components/Web'
import FaBeer from 'react-icons/lib/fa/beer'
/* import App1 from '../App1' */
import App2 from '../App2'
import Chat from '../App3'
import Switch from '../../components/Switch'

import AjaxTest from '../../components/Ajax'

import AxiosTest1 from '../../components/AxiosTest1'

import ReactEcharts from 'echarts-for-react'

import echarts from 'echarts'

/* import PubSub from 'pubsub-js' */

interface IState {
  SummitMessage?: string
  WebMessage?: string
  message? : string
  echartOption: any
}
export interface IProps {
  empty?: any
}

class App extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      SummitMessage: '',
      WebMessage: '',
      echartOption: this.getOption()
    }
    this.receiveFromSummit = this.receiveFromSummit.bind(this)
    this.receiveFromWeb = this.receiveFromWeb.bind(this)
    this.getOption = this.getOption.bind(this)
    /* this.recieveFromSwitch = this.recieveFromSwitch.bind(this) */
  }
  public say() {
    alert('test')
  }
  public receiveFromSummit(content: any) {
    this.setState({
      WebMessage: content
    }, () => {
      console.log(`父容器收到信息，内容为：${this.state.WebMessage}`)
    })
  }

  getOption() {
    return {
      title: {
          text: 'ECharts 入门示例1'
      },
      tooltip: {},
      xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    }
  }
  /* recieveFromSwitch(content: any) {
    this.setState({
      message: content
    }, () => {
      console.log(`父容器接收到的信息内容为：${this.state.message}`)
    })
  } */

  componentDidMount() {
    const myChart = echarts.init(document.getElementById('myEcharts'))
    myChart.setOption(
      {
        title: {
            text: 'ECharts 入门示例1'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      }
    )
    /* PubSub.subscribe(UniqueId, (msg, data) => { */
      /* this.setState({
        echartOption: data
      }, () => {
        console.log('1')
      }) */
      /* console.log(data) */
    /* })
     */
  }

  receiveFromWeb(content: any) {
    this.setState({
      SummitMessage: content
    })
  }
  public render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={require('./image/logo.svg')} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcomes to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <App1/> */}
        <App2/>
        <Chat/>
        <h3>分割线哈</h3>
        <AxiosTest1/>
        <Switch/>
        <h3>分割线哈</h3>
        <Button onClick={this.say}> antd test</Button>
        <Summit message={this.state.SummitMessage} onSay={this.receiveFromSummit}/>
        <h3>分割线哈</h3>
        <AjaxTest />
        <h3> Lets go for a <FaBeer size={40} color='#a24b' />? </h3>
        <Web message = {this.state.WebMessage} onSendMessage={this.receiveFromWeb}/>
        <MaptalksCom mapStyle={{height: '500px'}} />
        <ReactEcharts option={this.state.echartOption}/> 
         <div id='myEcharts' style={{'width' : '500px', 'height' : '500px'}}/>   
      </div>
    )
  }
}

export default App
