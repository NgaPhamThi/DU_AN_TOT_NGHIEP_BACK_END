const a = {
    "vnp_TmnCode": "KR1JEPEA",
    "vnp_HashSecret":"WMUUNBCSYYTTOJXMAXVJVWVEUAQJJZDO",
    "vnp_Url":"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    "vnp_ReturnUrl":"http://localhost:5173/successful"
}


const config = {
    get: (key) => {
        return a[key];
    }
}
export default config