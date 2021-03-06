import React,{Component} from 'react'
import style from 'styled-components'
import AddTimeImage from '../assets/img/addtime.png'
import Modal from '../components/modal'
class Item extends Component{
    constructor(props){
        super(props)
        this.state ={
            course_name : '',
            showModal: false,
            addTime: "00:00",
            sum: 0,
            avg: 0,
            min: 0,
            max: 0
        }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.getTime = this.getTime.bind(this)
    this.getHideBack = this.getHideBack.bind(this)
    this.calStat = this.calStat.bind(this)
    this.convertTimeToInt = this.convertTimeToInt.bind(this)
    }

  async getTime(callback){
    
    await this.props.listenNameAdded(this.props.courses_name)
    await this.props.getAddTimingFromItem(callback)  
    await this.setState({
        addTime: callback
    })
  }
  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  
  getHideBack(callback){
    this.setState({ showModal: callback });
  }
  componentWillMount(){
    this.calStat()
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.data !== this.props.data){
        this.calStat()  
    }
  }
  

  async calStat(){
    var min =  100000
    var max = -1
    var sum = 0
    var itr = 0
    
    await Object.entries(this.props.data).map(([key, value]) => {
        var m = this.convertTimeToInt(value.duration)
        if(m < min) min = m
        if(m > max) max = m
        sum += m
        itr++
     })
    // console.log(sum,itr)
    await this.setState({
        avg: (sum/60/itr).toFixed(2),
        min: (min/60).toFixed(0),
        max: (max/60).toFixed(0)
    })
  }
  convertTimeToInt(time){
      var hr = 0
      if(time.charAt(0) == '0') hr = parseInt(time.charAt(0), 10) + parseInt(time.charAt(1), 10)       
      else hr = (parseInt(time.charAt(0), 10)*10) + parseInt(time.charAt(1), 10) 
      var m = parseInt(time.charAt(3)+time.charAt(4), 10) 
      return (hr*60)+m
  }

    render(){
        const ItemWrapper = style.div`
        overflow: hidden;
        padding: 5 5 32px;
        margin: 35px auto 0;
        width: 65%;
        height: 155px;
        box-shadow: 0 0 3px rgba(0, 0, 0, .05), 0 0px 12px rgba(0, 0, 0, .08);
        border-radius: 13px;
        background-color: #FFFF;
        `
        const ItemName = style.div`
        text-align: left;
        padding-left: 20px;
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
        `
        const ItemDetail = style.div`
        text-align: left;
        padding-left: 20px;
        padding-top: 10px;
        font-size: 12px;
        font-weight: normal;
        `

        const Addtime = style.input`
        float: right;
        height: 50%;
        padding-right: 2%;
        border: none;
        outline: none;
        `
       

    return(
        <div>
            <ItemWrapper>

                <ItemName>หัวข้อเรียน : {this.props.courses_name}</ItemName>
                <Addtime type="image" src={AddTimeImage} align="right" onClick={this.showModal} />
                <ItemDetail>ค่าเฉลี่ยในการเรียนรู้หัวข้อนี้ : {this.state.avg} ชั่วโมง</ItemDetail>
                <ItemDetail>เวลาที่น้อยที่สุดคือ : {this.state.min} ชั่วโมง   </ItemDetail>
                <ItemDetail>เวลาที่มากที่สุดคือ {this.state.max} ชั่วโมง</ItemDetail>
                <ItemDetail>เวลาเฉลี่ยในการสอน : {this.props.dataYoutube["Youtube"].duration} ชั่วโมง</ItemDetail>
                
                
            </ItemWrapper>
            <Modal showModal={this.state.showModal} getTimeProps={this.getTime.bind(this)} listenHide={this.getHideBack.bind(this)}/>
        </div>
    );
    } 
    
}

export default Item;