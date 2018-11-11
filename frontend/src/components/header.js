import React from 'react'
import style from 'styled-components'
import ClockIcon from '../assets/img/time.png'
const Header = style.p`
    font-size: 50px;
    font-weight: normal;
    font-family: 'Lobster','Raleway' ,'Mali', cursive;
    color: #000; 
    padding-top: -20px;
    top: 0px;
`
const Icon = style.img`
width: 50px;
height: 50px`
export default () => (
    <div>
        <Header> Count DEV <Icon src={ClockIcon} /></Header>
    </div>
)

