import React from 'react'
import axios from 'axios'
import style from  'styled-components'
import Header from '../components/header'
import Search from '../components/search'
import Item from '../components/item'
import Navbar from '../components/navbar'
class Home extends React.Component {
  
  
  constructor(props){
    super(props)    
      this.state={
        courses: [],
        Item: [],
        inputSearching: ""
      }
    this.getSearching = this.getSearching.bind(this)
    this.getCourses = this.getCourses.bind(this)
    this.getFromFirebase = this.getFromFirebase.bind(this)
    this.alertTest = this.alertTest.bind(this)
    // this.InitItem = this.InitItem.bind(this)
}   
  

  componentDidMount() {
    this.getFromFirebase()
  }

  getFromFirebase(){
    var self = this
    let app = this.props.db.database().ref('courses');
    app.once('value').then(function(snapshot) {
        var c = snapshot.val()
        // console.log(snapshot.val())  
        self.getCourses(c)
      });
    
  }

  getCourses(value){
    this.setState({
      courses: value
    })
    console.log(this.state.courses)
  }

  getSearching(input){
    this.setState({
      inputSearching: input
    })
  }

  // InitItem(){
  //   var maxItem = 10
  //   var count = 1
  //   for(var key in this.state.courses){
  //     if(this.state.courses.hasOwnProperty(key) && count != maxItem) {
  //         console.log(key + " -> " + this.state.courses[key]);
  //         count++
  //     }
      
  // }
  // }

  alertTest(){
    alert(Object.keys(this.state.courses))

    for(var key in this.state.courses){
      if(this.state.courses.hasOwnProperty(key)) {
          console.log(key + " -> " + this.state.courses[key]);
      }
  }}

  async getAPI(){
  //   axios.get('https://ywchw-221815.firebaseio.com/courses.json')
  //   .then((response) => {
  //     console.log(response);
  //     this.setState({courses: response.data})
  //     console.log(this.state.courses)
  //   })
  //  .catch((error)=>{
  //     console.log(error);
  //  });
  }
  
  



  
  render() {

    const SpacePadding = style.div`
    padding-top: 200px;
    `
    
    return (
      <div>
      <Navbar getInputSearching={this.getSearching.bind(this)} />
      <SpacePadding />
      {
     // <Header />
     // <Search />
      
        //<button onClick={this.alertTest}></button>
      }
      {Object.keys(this.state.courses).map(item => (<Item courses_name={item} />))}
      <Item />
      <Item />
      <Item />
      <Item />
      </div>
    );
  }
}

export default Home
