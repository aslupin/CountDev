import React,{Component} from 'react'
import style from 'styled-components'
class Item extends Component{
    constructor(props){
        super(props)
        this.state ={
            course_name : ''
        }
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

    return(
        <div>
            <ItemWrapper>
            
                <ItemName>หัวข้อเรียน : {this.props.courses_name}</ItemName>
            
            </ItemWrapper>
            
        </div>
    );
    } 
    
}

export default Item;