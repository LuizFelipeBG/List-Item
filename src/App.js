import React, { Component } from 'react';
import './App.css';
import {findItems,createItem} from './api-client';

class App extends Component {
    state = {
      item: '',
      listItem: []
    }

    find = async () => {
      this.setState({listItem: await findItems()})
    }

    create = async () => {
     await createItem({name: this.state.item})
    }
    
    handleChange = (event) => {
      this.setState({item: event.target.value})
    }
    
    addList =async () => {
      await this.create()
      this.find()
      }

    refreshList = () => {
        this.find()
      }

    componentDidMount(){
        this.find()
    }

  render() {
    return (
        <div className='row'>
           <input className='input' onChange={this.handleChange} value={this.state.item}/>
           <button className='button' onClick={this.addList}>Add</button>
           <button className='refresh' onClick={this.refreshList}>Refresh List</button>
           <h3>{this.state.listItem.map(x => <p>{x.name}</p>)}</h3>
        </div>
    );
  }

}
export default App;
