import React,{Component} from 'react'
import SearchBoxImage from '../assets/img/search_box.png'
import style from 'styled-components'
class Search extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.props.inputValue(e.target.value)
    }
    
    render(){
    const SearchBox = style.input`
    font-family: 'Mali', cursive;
    background-image: url(${SearchBoxImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 55%;
    height: 55px;
    font-size: 15px;
    border: none;
    border-radius: 16px;
    outline: none;
    padding-left: 30px;
    padding-top: -90px;
    top: 0px;
    `;


    const itemSearch = this.props.itemSearch
    
    return(
            <div>
            <form>
               <SearchBox 
                    autoFocus
                    placeholder="ค้นหาหัวข้อที่ต้องการดูชั่วโมงเฉลี่ยในการเรียนรู้ ..."
                    type="text"
                    value={itemSearch} 
                    onChange={this.handleChange} 
                    />
            </form>
            </div>
        );
    } 
    
}

export default Search;