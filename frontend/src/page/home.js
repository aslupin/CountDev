import React from 'react'
import axios from 'axios'
import style from  'styled-components'
import Header from '../components/header'
import Search from '../components/search'
import Item from '../components/item'
import Navbar from '../components/navbar'
import Modal from 'react-modal'
class Home extends React.Component {
  
  
  constructor(props){
    super(props)    
      this.state={
        courses: [],
        Item: [],
        inputSearching: "A",
        showModal: false,
        addTime: '00:00'
      }
    this.getSearching = this.getSearching.bind(this)
    this.getCourses = this.getCourses.bind(this)
    this.getFromFirebase = this.getFromFirebase.bind(this)
    this.alertTest = this.alertTest.bind(this)
    this.callbackGetTimeAdding = this.callbackGetTimeAdding.bind(this)
    }
    // this.InitItem = this.InitItem.bind(this)
// }   
//   shouldComponentUpdate(nextProps, nextState){
//   if(nextState.inputSearching === this.state.inputSearching){
//     return false
//     }
//   else return true
//   } 
//   componentWillUpdate(nextProps, nextState){
//     this.getFromFirebase()
//   }
  componentDidUpdate(prevProps, prevState){
    if(prevState.inputSearching !== this.state.inputSearching){
      this.getFromFirebase()  
    }
  }
  componentDidMount() {   
    this.initItemFromFirebase()
  }

  initItemFromFirebase(){
    var self = this
    let app = this.props.db.database().ref('courses');
    app.once('value').then(function(snapshot) {
            var c = snapshot.val()            
            if(c !== null){
              self.getCourses(c)
            }
        });
  }

  getFromFirebase(){
    var self = this
    let app = this.props.db.database().ref('courses');
   
    app.orderByKey().startAt(self.state.inputSearching).endAt(self.state.inputSearching+"\uf8ff").on("value", function(snapshot) {
      var c = snapshot.val()
        if(c !== null && self.state.inputSearching !== ''){  
          self.getCourses(c)
        }
        else if(self.state.inputSearching === ''){
          self.initItemFromFirebase()
        }
        else self.clearItem()
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

  clearItem(){
    this.setState({ courses: [] })
  }

  callbackGetTimeAdding(callback){
    this.setState({
      addTime: callback
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
      
      {Object.keys(this.state.courses).map(item => (
        <Item 
        courses_name={item} 
        callbackGetTimeAddingProps={this.callbackGetTimeAdding.bind(this)} 
        />))}
        {this.state.AddTime}
      </div>
    );
  }
}

export default Home
