import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import styled from "styled-components"
import { CATEGORY_DIRECTION }  from "../../constants";
import { Accounts, Categories } from "./components";
import LineChart from "./components/charts/line-chart";
import { reportAmountByAccount, reportAmountByCategory, reportAmountByMonth  }
                            from "./components/charts/utils/dataset";
import { ToggleGroup } from "./components/button/button";
import { Loader, useParentComponent } from "../../components";
import { request } from "../../utils";
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../actions'

const MainContainer = ({className}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [reportByMonth, setReportByMonth] = useState(null);
    const [reportByCategory, setReportByCategory] = useState(null);
    const [reportByAccount, setReportByAccount] = useState(null);
    const [direction, setDirection] = useState(CATEGORY_DIRECTION.INCOME)
    const { loaderRef, decrementLoadingCount, setLoadingCount } = useParentComponent();

    const onButtonClick = (type) => {
        setLoadingCount(3)
        setReportByMonth(null)
        setReportByCategory(null)
        setReportByAccount(null)
        setDirection(type)
    }

    const fetchReportData = async (direction) => {
        const dataByMonth = await reportAmountByMonth(direction)
        const dataByCategory = await reportAmountByCategory(direction)
        const dataByAccount = await reportAmountByAccount(direction)

        setReportByMonth(dataByMonth)
        setReportByCategory(dataByCategory)
        setReportByAccount(dataByAccount)
    }

    const initUser = async () => {
        await request("/api/user/getUserFromCookie")
            .then(({error, user})=> {
                if (error) {
                    navigate('login');
                    //console.log(data)
                }
                else {
                    dispatch(setUser(user));
                    sessionStorage.setItem('userData', JSON.stringify(user))
                }
            })
    }

    useEffect(() => {
        fetchReportData(direction)
        initUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction] );

    return (
        <div className={className}>
           { <Loader count={6} ref={loaderRef} /> }
           <div className="references">
                <div className="container">
                    <div><Categories direction={CATEGORY_DIRECTION.INCOME} onLoad={decrementLoadingCount}/></div>
                    <div><Accounts onLoad={decrementLoadingCount}/></div>
                    <div><Categories direction={CATEGORY_DIRECTION.EXPENSE } onLoad={decrementLoadingCount}/></div>
                </div>
            </div>
            <div className="query">
                <ToggleGroup onClick={onButtonClick}/>
            </div>
            <div className="analitics">
                <div className="container">
                    {
                        reportByMonth &&
                        <LineChart
                            labels = { reportByMonth.labels  }
                            data = { reportByMonth.totals }
                            title = {"По месяцам"}
                            onLoad={decrementLoadingCount} />
                    }
                    {
                        reportByCategory &&
                        <LineChart
                            labels = { reportByCategory.labels  }
                            data = { reportByCategory.totals }
                            title = {"По категориям"}
                            onLoad={decrementLoadingCount} />
                    }
                    {
                        reportByAccount &&
                        <LineChart
                            labels = { reportByAccount.labels  }
                            data = { reportByAccount.totals }
                            title = {"По счетам"}
                            onLoad={decrementLoadingCount} />
                    }
                </div>
            </div>
       </div>
    );
}

export const Main = styled (MainContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

& .references  {
    height: 40vh;
    width: 100%;
    background-color: #e0e0e0;
    border: 2px solid #000;
    box-sizing: border-box;
}

& .analitics  {
    height: 30vh;
    width: 100%;
    background-color: #e0e0e0;
    border: 2px solid #000;
    box-sizing: border-box;
}

& .period {
    display: flex;
    flex-direction: row;
    justify-content:flex-end;
    align-items: center;
    margin-right: 10px;
    margin-right: 10px;
}

& .container {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: space-between
    padding: 10px;
    width: 100%;
    height: 100%;
}

& .container > div {
    flex: 1;
    text-align: center;
    padding: 10px;
    border: 1px solid #000;
}

& .query {
    display: flex;
    flex-direction: row;
}
`
