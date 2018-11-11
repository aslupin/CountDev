import React,{Component} from 'react'
import style from 'styled-components'
import ModalAdd from '../components/modal_add'
class ItemAdd extends Component{
    constructor(props){
        super(props)
        this.state ={
            course_name : '',
            showModal: false,
            addTime: "00:00"
        }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    // this.getTime = this.getTime.bind(this)
    this.getHideBack = this.getHideBack.bind(this)
    }

  async getName(callback){
    await this.props.getNameCreate(callback)  
    // await this.props.listenNameAdded(this.props.courses_name)
    // await this.setState({
    //     addTime: callback
    // })
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
        height: 130px;
        box-shadow: 0 0 1px rgba(0, 0, 0, .05), 0 0px 8px rgba(0, 0, 0, .08);
        border-radius: 9px;
        background-color: #FFFF;
        border: 2px solid #666;
        color: #333;

        `
        const ItemName = style.div`
        text-align: center;
        margin-top: 6%;
        font-size: 23px;
        font-weight: normal;
        `
       
    // const itemSearch = this.props.itemSearch
    return(
        <div>
            <ItemWrapper onClick={this.showModal}>
            <ItemName> คลิ๊กเลย! เพื่อเพิ่มหัวข้อใหม่</ItemName>
                {/*
                <Addtime type="image" src={AddTimeImage} align="right" onClick={this.showModal} />
                <ItemName>เวลาที่คุณใส่ในหัวข้อนี้ : {this.state.addTime} ชั่วโมง</ItemName>
                */}
            </ItemWrapper>
            <ModalAdd showModal={this.state.showModal} getNameProps={this.getName.bind(this)} listenHide={this.getHideBack.bind(this)}/>
        </div>
    );
    } 
    
}

export default ItemAdd;