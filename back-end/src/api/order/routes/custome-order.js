module.exports = {
    routes :  [
        {
            method : "DELETE",
            path : '/order/refund/:id',
            handler : 'order.refundHandler',
        },
        
    ]   
}