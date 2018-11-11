import React,{Component} from 'react'
import style from 'styled-components'
import modal from 'react-modal'
import TimeField from 'react-simple-timefield';

class Modal extends Component{
    constructor(props){
        super(props)
        this.state ={
            showModal: false,
            time: "00:00",
            showerr: false
        }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.onTimeChangeHandler = this.onTimeChangeHandler.bind(this)
    this.addTime = this.addTime.bind(this)
    }
  componentWillReceiveProps(nextProps){

    this.setState({
      showModal: nextProps.showModal
      // showModal: this.props.showModal
    })

  }
      
  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  onTimeChangeHandler(time){
    this.setState({time})
  }

  async addTime(){
    if(this.state.time !== "00:00"){
      await this.props.getTimeProps(this.state.time)
      await this.setState({time: "00:00"})
      await this.hideModal()
      await this.props.listenHide(this.state.showModal)
    }
    else this.setState({showerr: true})
  }

    render(){
        const Modal = style(modal)`
        text-align: center;
        font-family: 'Mali';
        margin-top: 8%;
        margin-left: 25%;
        margin-right: 25%;
        height: 47%;
        background-color: #FFF;
        box-shadow: 0 0 13px rgba(0, 0, 0, .05), 0 0px 32px rgba(0, 0, 0, .08);
        border-radius: 36px;
        outline: none;
        `
       

    const {time} =this.state
    return(
      
        <div>
          <Modal isOpen={this.state.showModal} onRequestClose={this.hideModal} ariaHideApp={false} >

            <p style={{textAlign: 'right', paddingRight:'20px', paddingTop:'10px', fontSize: '30px', cursor:'default'}} onClick={this.hideModal} >x</p>
            <p style={{fontSize: '20px'}}>ใส่เวลาในการเรียนรู้ของหัวข้อนี้</p>
            <div style={{paddingTop:'15px'}}></div>
            <div style={{display: 'inline-block'}}>
            <TimeField value={time} onChange={this.onTimeChangeHandler}
                style={{
                  textAlign: 'center',
                  border: '2px solid #666',
                  fontSize: '32px',
                  width: '110px',
                  padding: '5px 8px',
                  color: '#333',
                  borderRadius: 3,
                  fontFamily: 'Mali',
                  outline: 'none',
                  paddingRight: '25px'
                }} />
                <span>      </span>Hr.
            </div>
            
            {/*this.state.showerr ? <p style={{paddingTop:'15px'}}>ต้องใส่ชั่วโมงก่อนครับ</p> : <div style={{paddingTop:'70px'}}></div>*/}
            <div style={{paddingTop:'70px'}}></div>
            <button 
                  onClick={this.addTime}
                  type="submit"

                  style={{
                  textAlign: 'center',
                  border: '2px solid #666',
                  fontSize: '18px',
                  width: 'cover',
                  padding: '5px 8px',
                  color: '#333',
                  borderRadius: 3,
                  fontFamily: 'Mali',
                  outline: 'none',
                  paddingRight: '25px'
                }} 
                >
            เพิ่มเวลา
            </button>
            
            
            
            
            
            
          </Modal>
             
        </div>
    );
    } 
    
}

export default Modal;