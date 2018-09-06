import React from 'react'; 


//3자리 이상 콤마를 찍어주는 함수
export function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

