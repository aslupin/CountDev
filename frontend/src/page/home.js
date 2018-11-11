import React from 'react'
import axios from 'axios'
import style from  'styled-components'
import Item from '../components/item'
import Navbar from '../components/navbar'
import ItemAdd from '../components/item_add';
class Home extends React.Component {
  
  
  constructor(props){
    super(props)    
      this.state={
        courses: [],
        Item: [],
        inputSearching: "A",
        showModal: false,
        addTime: "00:00",
        nameAddTiming: '',
        nameNewCourse: '',
        dataYoutube: null,
        timeYoutube: null
      }
    this.getSearching = this.getSearching.bind(this)
    this.getCourses = this.getCourses.bind(this)
    this.getFromFirebase = this.getFromFirebase.bind(this)
    this.callbackGetTimeAdding = this.callbackGetTimeAdding.bind(this)
    this.listenAddTiming = this.listenAddTiming.bind(this)
    this.addToFireBaseWithTiming = this.addToFireBaseWithTiming.bind(this)
    this.newCourseInFirebase = this.newCourseInFirebase.bind(this)
    this.newCourse = this.newCourse.bind(this)
    this.formatToReadyREST = this.formatToReadyREST.bind(this)
    this.getDataFromYoutube = this.getDataFromYoutube.bind(this)
    this.getTimeFromYouTube = this.getTimeFromYouTube.bind(this)
    this.convertToTimeFormat = this.convertToTimeFormat.bind(this)
    this.convertToTimeFormat = this.convertToTimeFormat.bind(this)
    
    }


  componentDidUpdate(prevProps, prevState){
    if(prevState.inputSearching !== this.state.inputSearching){
      this.getFromFirebase()  
    }
    if(prevState.addTime !== this.state.addTime){
      this.addToFireBaseWithTiming()
    }
    if(prevState.nameNewCourse !== this.state.nameNewCourse){
      this.newCourseInFirebase()
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



  async addToFireBaseWithTiming(){
    var self = this
    let app = this.props.db.database()
    var newGenKey = app.ref('courses').child(this.state.nameAddTiming).push().key;
    await app.ref('courses/' + this.state.nameAddTiming + '/' + newGenKey).set({
      duration: this.state.addTime
    });
    self.initItemFromFirebase()
  }

  
  async newCourseInFirebase(){
    var self = this
    let app = this.props.db.database()
    
   

    var newGenKey = app.ref('courses').child(this.state.nameNewCourse).push().key;
    await this.getDataFromYoutube()
    var txt = '0'+String(this.state.timeYoutube).replace('.',":")
    if(txt.length >= 5) txt = txt.replace('00','0')
    await app.ref('courses/' + this.state.nameNewCourse + '/Youtube').set({
      duration: txt
    });
    
          self.initItemFromFirebase()
    
    
  }

  formatToReadyREST = (txt) =>{
    txt.replace(' ','+')
    txt += '+Learning'
  }

   async getDataFromYoutube(){
    var subtxt = await this.formatToReadyREST(this.state.nameNewCourse)
    subtxt = "Nodejs+Learning"
    await axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q='+ subtxt +'&key=AIzaSyC0OGL8AFEsT0StouXOnfu9l8WrFrZ3OwA')
    .then(res => {
      const f = res.data;
      this.setState({ dataYoutube: f['items'] });
    })
    var sum = await this.getSumTimeYoutube()
    await this.setState({timeYoutube: sum})
  }


  async getSumTimeYoutube(){
    var sum =0
    var ignorelist = 0
    for(var i=0;i<this.state.dataYoutube.length;i++){
      // console.log(this.state.dataYoutube[i]['id']['kind'])
      if(this.state.dataYoutube[i]['id']['kind'] !== "youtube#playlist" ){
        // console.log("ya",this.state.dataYoutube[i]['id']['videoId'])
        var a = await this.getTimeFromYouTube(this.state.dataYoutube[i]['id']['videoId'])
        sum += a
        // console.log("SUM",sum)
      }
      else{
        ignorelist++
      }
    }
    
    return ((sum/60) / (this.state.dataYoutube.length - ignorelist)).toFixed(2)
  }


  async getTimeFromYouTube(id){
    var time = 0
    // console.log(id)
    await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=` + id +`&part=contentDetails&key=AIzaSyC0OGL8AFEsT0StouXOnfu9l8WrFrZ3OwA`)
    .then(res => {
      const f = res.data;
      time = f['items'][0]['contentDetails']['duration']
    })
    var timeInt = this.convertToTimeFormat(time)
    // console.log(timeInt)
    return timeInt
  }

  convertToTimeFormat(time){
    // console.log("TIME",time)
    var H = ''
    var M = ''
    var i=2
   for(;i<time.length;i++){
       if(time.charAt(i) !== 'H' && time.charAt(i) !== 'M') H += time.charAt(i)
        else {
          i = i+1
          break
        }
   }
   for(;i<time.length;i++){
     if(time.charAt(i) !== 'M' && time.charAt(i) !== 'S') M += time.charAt(i)
     else if(time.charAt(i) == 'S'){
       M = '0'
       break
     }
     else break
   }
    // console.log(H,M,(parseInt(H,10) * 60 ) + parseInt(M,10))
    return (parseInt(H,10)*60) + parseInt(M,10)
  }

  getCourses(value){
    this.setState({
      courses: value
    })
    // console.log(this.state.courses)
  }

  getSearching(input){
    this.setState({
      inputSearching: input
    })
  }

  clearItem(){
    this.setState({ courses: [] })
  }

   newCourse(callback){
     this.setState({
      nameNewCourse: callback
    } )
    
    
  }
  callbackGetTimeAdding(callback){
    this.setState({
      addTime: callback
    })
  }
  listenAddTiming(callback){
     this.setState({
      nameAddTiming: callback
    })
    // this.addToFireBaseWithTiming()
  }

  
  render() {

    const SpacePadding = style.div`
    padding-top: 200px;
    `
    
    return (
      <div>
      <Navbar getInputSearching={this.getSearching.bind(this)} />
      <SpacePadding />
      <ItemAdd getNameCreate={this.newCourse.bind(this)}/>
      {Object.keys(this.state.courses).map(item => (
        <Item 
        getAddTimingFromItem={this.callbackGetTimeAdding.bind(this)} 
        listenNameAdded={this.listenAddTiming.bind(this)}
        courses_name={item}
        data={this.state.courses[item]}
        dataYoutube={this.state.courses[item]}     
        />))}
        <div style={{paddingTop:'120px'}}></div>        
        
        </div>

      
    );
  }
}

export default Home
