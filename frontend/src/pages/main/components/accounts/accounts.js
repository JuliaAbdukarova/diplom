import { useEffect, useState } from "react";
import styled from "styled-components"
import { request } from '../../../../utils'
import { Link } from "react-router-dom";
import { Icon } from "../../../../components";

const AccountsContainer = ({className, onLoad}) => {
    const [accounts, setAccounts] = useState([]);

    useEffect(()=>{
        request(`/api/account?noLimit=true`)
        .then(({data: {accounts}})=>{
            setAccounts(accounts);
        });

        onLoad();
    },[]);

    return (
        <div className={className}>
            <div className = "right">
                <Link to="/account">
                    <Icon icon_id="fa fa-pencil-square-o" margin="10px 0 0 16px"/>
                </Link>
            </div>
            <div className="caption">
                СЧЕТА
            </div>
            <ul >
                {
                    accounts.map(({_id, description, type, iconUrl})=>(
                        <li key={_id} id={_id}>
                            {description}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export const Accounts = styled (AccountsContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    font-size: 18px;
    width: 100%;

    & .right {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    & .caption {
        display: flex;
        height: 10px;
        margin: 10px 0 0 16px;
        font-weight: bold;
    }

    & .accounts-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;

    & .no-accounts-found {
        font-size: 18px;
        text-align: center;
    }



}
`

/*

    & .zebra {
        list-style: none;
        border-left: 10px solid #FC7574;
        padding: 0;
        font-family: "Lucida Sans";
    }

    & .zebra li {padding: 10px;}
    & .zebra li:nth-child(odd) {background: #E1F1FF;}
    & .zebra li:nth-child(even) {background: white;}


*/
