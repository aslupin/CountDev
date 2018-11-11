import React from 'react'
import style from 'styled-components'
import Header from '../components/header'
import Search from '../components/search'
class Navbar extends React.Component {
  constructor(props){
    super(props)    
      this.state={
        ItemSearch: ""
      }
      this.myCallBackItemListening = this.myCallBackItemListening.bind(this)
}   

myCallBackItemListening(itemSearch){
  this.setState({
    ItemSearch: itemSearch
  },() => {
    this.props.getInputSearching(this.state.ItemSearch)
  })
  
  
}




  
  render() {
    const Wrapper = style.div`
    
    background-repeat: no-repeat;
    background-position: center;
    background-size: 670px;
    padding-top: -50px;
    top: 0px;
    position: fixed;
    width: 100%;
    `
    
    const SpacePadding = style.div`
    padding-top: 10px;
    `

    
    return (
    <div>
    <Wrapper>
        <Header />
        <Search 
          itemSearch={this.state.ItemSearch} 
          inputValue={this.myCallBackItemListening.bind(this)} 
        />
    </Wrapper>  
    
    </div>
    );
  }
}

export default Navbar
