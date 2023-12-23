//const {validationResult} = require('express-validator')
//const ApiError = require('../exceptions/api-error')
const ReportService =  require('../service/report-service')
const { verify } = require('../helpers/token')

class ReportController {
    
    async reportAmountByMonth(req, res, next) { 
        //if (!req.cookies?.token)
        //    return
        const direction =  req.params?.direction;
        //console.log( 'reportAmountByMonth = ', direction );
        try {
            const tokenData = verify(req.cookies.token);
            const data = await ReportService.reportAmountByMonth(tokenData?.id, direction, 'period');
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async reportAmountByCategory(req, res, next) {
        //if (!req.cookies?.token)
        //    return

        const direction =  req.params?.direction;
        try {
            const tokenData = verify(req.cookies.token);
            const data = await ReportService.reportAmountByCategory(tokenData?.id, direction, 'period');
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async reportAmountByAccount(req, res, next) {
        //if (!req.cookies?.token)
        //    return
        try {
            const direction =  req.params?.direction;
            const tokenData = verify(req.cookies.token);
            const data = await ReportService.reportAmountByAccount(tokenData?.id, direction, 'period');
            res.send(data);
        } catch (e) {
            next(e);
        }
    }
    
}

module.exports = new ReportController()