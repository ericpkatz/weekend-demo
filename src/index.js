import React, { Component} from 'react';
import { render } from 'react-dom';
import axios from 'axios';



const root = document.getElementById('root');


class MyForm extends Component{
  constructor({ onSave }){
    super();
    this.state = { name: 'abc'};
    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = onSave;

  }
  onNameChange(ev){
    this.setState({ name: ev.target.value });
  }
  render(){
    console.log('rendering');
    return (
      <div>
        <div className='form-group'>
          <input className='form-control' value={ this.state.name } onChange={ this.onNameChange }/>
        </div>
        <button onClick={ ()=> this.onSave( this.state.name ) }>Save</button>
      </div>
    );
  }
}
class App extends Component{
  constructor(props){
    super();
    this.specialNumber = props.specialNumber; 
    this.state = { products: [], specialNumber: props.specialNumber};
    this.onSave = this.onSave.bind(this);
  }
  onSave(name){
    this.setState({ specialNumber: name });
  }
  componentDidMount(){
    axios.get('/api/products')
      .then( response => response.data)
      .then( products => this.setState({ products }));
  }
  render(){
    return (
      <div className='well'>
        { this.state.specialNumber }
        { ' ' }
        { this.state.products.length }
        <MyForm onSave={ this.onSave }/>
      </div> 
    );
  }
}


render(<App specialNumber={42}/>, root);
