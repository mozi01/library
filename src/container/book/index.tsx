import * as React from 'react'
import {Button, Table, Input} from 'antd'
import Ajax from '../../utils/Ajax'

interface IState {
  items : any
  listDisplay : any
  item: any
  detailDisplay : any
  addDisplay : any
}

interface IProps {
  test?: any
}

export default class Book extends React.Component<IProps, IState> {
  bookName
  bookLabels
  bookAuthor
  bookContent
  columns = [
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
      width: '150px'
    }, 
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: '350px'
    }, 
    {
      title: '标签',
      dataIndex: 'labels',
      key: 'labels',
      width: '150px'
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: '150px'
    },
    {
      title: '操作',
      key: 'action',
      width: '150px',
      render: (record) => (
        <div>
          <span style={{ marginRight: '15px' }}>
            <a onClick={this.showDetail.bind(this, record.key)}>查看详情</a>
          </span>
          <span>
            <a onClick={this.deleteBookById.bind(this, record.key)}>删除</a>
          </span>
        </div>       
      ),
    }
    ]

  constructor(props : IProps, state : IState) {
    super(props)
    this.state = {
      item: {},
      items : [],
      listDisplay : 'block',
      detailDisplay : 'none',
      addDisplay : 'none'
    }
    this.getBookList = this.getBookList.bind(this)
    this.getBookById = this.getBookById.bind(this)
    this.goBackList = this.goBackList.bind(this)
    this.addBook = this.addBook.bind(this)
    this.cancelAddBook = this.cancelAddBook.bind(this)
    this.saveBook = this.saveBook.bind(this)
  }

  componentDidMount() {
    this.getBookList()
  }

  getBookList() {
    Ajax.get('gzr/books', {}).then((res: any) => {
      if (res!.data!.length > 0 ) {
        const results = res.data
        console.log(results)
        const bookItems: any = []
        results.map(item => {
          const bookItem = {
            key: item._id.$oid,
            name: item.name,
            content: item.content,
            labels: item.labels,
            author: item.author
          }
          bookItems.push( bookItem )
        }) 
        this.setState({
          items : bookItems
        })
      }
    })
  }

  getBookById(id: string) {
    Ajax.get('gzr/books/' + id, {}).then((res: any) => {
      if (res!.data!.length > 0) {
        console.log(res.data[0])
        this.setState({
          item : res.data[0]
        })
      } 
    })
  }

  deleteBookById = (id: string) => {
    Ajax.get('gzr/books/' + id + '/delete', {}).then((res: any) => {
      const itemArray = this.state.items
      if (res!.data!.length > 0) {       
        itemArray.map(item => {
          if (item.key === id) {
            const index = itemArray.indexOf(item)
            if (index > -1) {
              itemArray.splice(index, 1)
            }
          }
        })
      }
      this.setState({
        items : itemArray
      })
    })  
  }   

  showDetail = (id: string) =>  {
    this.getBookById(id)
    this.setState({
      listDisplay : 'none',
      addDisplay : 'none',
      detailDisplay : 'block'
    })
  }

  goBackList() {
    this.setState({
      listDisplay : 'block',
      detailDisplay : 'none',
      addDisplay : 'none'
    })
    this.getBookList()
  }

  addBook() {
    this.setState({
      listDisplay : 'none',
      detailDisplay : 'none',
      addDisplay : 'block'
    })
  }

  cancelAddBook() {
    this.setState({
      listDisplay : 'block',
      detailDisplay : 'none',
      addDisplay : 'none'
    })
    this.getBookList()
  }

  saveBook() {
    const bookName = this.bookName.input.value
    const bookLabels = this.bookLabels.input.value
    const bookAuthor = this.bookAuthor.input.value
    const bookContent = this.bookContent.input.value
    Ajax.get('gzr/books/add?name=' + bookName + '&content=' + bookContent + '&labels=' + bookLabels + '&author=' + bookAuthor, {}).then((res: any) => {
      console.log('新增成功')
      console.log(res)
      this.getBookList()      
      this.setState({
        listDisplay : 'block',
        detailDisplay : 'none',
         addDisplay : 'none'       
      })      
    })
    

  }
  render() {   
    const data = this.state.items
    
    return(
      <div>
        <div style={{display: this.state.listDisplay}}> 
          <Button onClick = {this.addBook}>增加</Button>      
          <Table
            columns={this.columns}
            dataSource={data}
            bordered
          />
        </div>
        <div style={{display: this.state.detailDisplay}}>
          <Button onClick={this.goBackList}>返回列表</Button><br/>
          <div>书名：{this.state.item.name}</div>
          <div>标签：{this.state.item.labels}</div>
          <div>作者：{this.state.item.author}</div>
          <div>内容：{this.state.item.content}</div>
        </div>
        <div style={{display: this.state.addDisplay}}>
          书名：<Input ref={node => this.bookName = node} style={{'width' : '360px', 'marginTop' : '10px'}}/><br/>
          标签：<Input ref={node => this.bookLabels = node} style={{'width' : '360px', 'marginTop' : '10px'}}/><br/>
          作者：<Input ref={node => this.bookAuthor = node} style={{'width' : '360px', 'marginTop' : '10px'}}/><br/>
          内容：<Input ref={node => this.bookContent = node} style={{'width' : '360px', 'marginTop' : '10px', 'marginBottom' : '10px'}}/><br/>
          <Button onClick = {this.saveBook} style={{'marginLeft' : '20px'}}>保存</Button>
          <Button onClick = {this.cancelAddBook} style={{'marginLeft' : '20px'}}>取消</Button>
        </div>
      </div>
    )
  }
}
