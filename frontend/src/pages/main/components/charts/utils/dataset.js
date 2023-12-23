import { request } from "../../../../../utils";

export const reportAmountByMonth = async (direction, period) => {
    let data;
    try {
        data = await request(`/api/report/AmountByMonth/${direction}`)
    } catch (e) {

    }
    return data;
}

export const reportAmountByCategory =  async (direction, period) => {
    let data;
    try {
        data = await request(`/api/report/AmountByCategory/${direction}`)
    } catch (e) {

    }
    return data;
}

export const reportAmountByAccount = async (direction, period) => {
    let data;

    try {
        data = await request(`/api/report/AmountByAccount/${direction}`)
    } catch (e) {

    }
    //console.log('dataset.reportAmountByAccount.data = ', data);

    return data;
}
