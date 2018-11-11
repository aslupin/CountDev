import React,{Component} from 'react'
import style from 'styled-components'
import modal from 'react-modal'

class ModalAdd extends Component{
    constructor(props){
        super(props)
        this.state ={
            showModal: false,
            time: "00:00",
            showerr: false,
            itemSearch: ""
        }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange = (e) => {
    // console.log(e.target.value)
    this.setState({itemSearch: e.target.value})
    
  }
  async handleSubmit(){
    if(this.state.itemSearch !== ''){
      await this.props.getNameProps(this.state.itemSearch)
      await this.hideModal()
      await this.props.listenHide(this.state.showModal)
      await this.setState({itemSearch: ''})
    }
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
        const SearchBox = style.input`
        font-family: 'Mali', cursive;
        width: 90%;
        height: 50px;
        font-size: 14px;
        border: 2px solid #666;
        border-radius: 16px;
        outline: none;
        padding-left: 30px;
        padding-top: -90px;
        top: 0px;
        `

        

    return(
      
        <div>
          <Modal isOpen={this.state.showModal} onRequestClose={this.hideModal} >

            <p style={{textAlign: 'right', paddingRight:'20px', paddingTop:'10px', fontSize: '30px', cursor:'default'}} onClick={this.hideModal} >x</p>
            <p style={{fontSize: '20px'}}>ใส่ชื่อหัวข้อใหม่ที่ต้องการ</p>
            <div style={{paddingTop:'15px'}}></div>
            <div style={{display: 'inline-block'}}>

            <SearchBox 
                    autoFocus
                    placeholder="ชื่อหัวข้อใหม่ ..."
                    type="text"
                    value={this.state.itemSearch} 
                    onChange={this.handleChange} 
            />
            </div>
            {/*this.state.showerr ? <p style={{paddingTop:'15px'}}>ต้องใส่ชั่วโมงก่อนครับ</p> : <div style={{paddingTop:'70px'}}></div>*/}
            <div style={{paddingTop:'70px'}}></div>
            <button 
                  onClick={this.handleSubmit}
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

export default ModalAdd;