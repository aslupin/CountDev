import React from 'react'
import style from 'styled-components'
const Header = style.p`
    font-size: 45px;
    font-weight: bold;
    font-family: 'Raleway' ,'Mali', cursive;
    color: #000; 
    padding-top: -20px;
    top: 0px;
`
export default () => (
    <div>
        <Header> Count DEV </Header>
    </div>
)

