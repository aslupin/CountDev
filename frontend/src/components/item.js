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
            addTime: "00:00"
        }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.getTime = this.getTime.bind(this)
    this.getHideBack = this.getHideBack.bind(this)
    }

  getTime(callback){
      this.props.callbackGetTimeAddingProps(callback)
    this.setState({
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
                <ItemName>เวลาที่คุณใส่ในหัวข้อนี้ : {this.state.addTime} ชั่วโมง</ItemName>
                
            </ItemWrapper>
            <Modal showModal={this.state.showModal} getTimeProps={this.getTime.bind(this)} listenHide={this.getHideBack.bind(this)}/>
        </div>
    );
    } 
    
}

export default Item;