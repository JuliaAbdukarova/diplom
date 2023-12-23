import { useEffect, useState } from "react"
import styled from "styled-components"

 const FooterContainer = ({className}) => {
    const [city, setCity] = useState('')

    return (
        <div className={className}>
            <div>
                <div>Учет доходов и расходов</div>
                <div>juliannas@list.ru</div>
            </div>
            <div>
                <div>{city} {new Date().toLocaleString('ru',{day:'numeric', month:'long'})}</div>
            </div>
        </div>
    )
}

export const Footer = styled(FooterContainer)`
    display:    flex;
    justify-content: space-between;
    line-items: center;
    width: 1000px;
    height: 80px;
    padding: 20px 40px;
    font-weight: bold;
    background-color: #fff;
    box-shadow: 0px 2px 17px #000;
    align-self: last baseline
`
