import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.handleFilterTextChange=this.handleFilterTextChange.bind(this);
    this.handleInStockChange=this.handleInStockChange.bind(this);
    
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e){
    this.props.onInStockChange(e.target.checked);
  }
  render(){
    return(
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextChange}/>
        <input type="checkbox" checked={this.props.InStockOnly} onChange={this.handleInStockChange}/>Voir produit en stock uniquement
      </form>
    );
  }
}

class AfficherProduit extends React.Component{
  render(){
    const produit = this.props.produit;
    return(
    <tr>
      <td>{produit.category}</td>
      <td>{produit.price}</td>
      <td>{produit.stocked}</td>
      <td>{produit.name}</td>
    </tr>
    );
  }
}

class AfficherTh extends React.Component{
  render(){
    const titre = this.props.titre;
    
    
    
    return (
    <th>{titre}</th>
    );


  }
}

class Tableau extends React.Component{
  render(){
    const products = this.props.products;
    const ths = Object.keys(products[0]);
    const titres= [];
    const produits =[];
    const filterText = this.props.filterText;
    const inStockOnly= this.props.inStockOnly;

    ths.forEach((th) =>{
      titres.push(<AfficherTh titre={th} key={th} />)
    });

    products.forEach((produit)=>{
      if(produit.name.indexOf(filterText) === -1){
        return
      }
      if(inStockOnly && !produit.stocked){
        return
      }

      produits.push(
        <AfficherProduit produit={produit} key={produit.name} />
        
      )
    });

    return (
      <table>
        <thead>
          <tr>{titres}</tr>
          
        </thead>
        <tbody>
          {produits}
        </tbody>
      </table>
    );
  }
  
}

class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filterText: '',
      inStockOnly : false
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange= this.handleInStockChange.bind(this);
  };

  handleFilterTextChange(filterText){
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly){
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  render(){
    return(
      <div>
      <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onInStockChange={this.handleInStockChange} onFilterTextChange={this.handleFilterTextChange}/>
      <Tableau products = {this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
      </div>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];



ReactDOM.render(
  <Page products = {PRODUCTS}/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
