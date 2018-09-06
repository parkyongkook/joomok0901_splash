import * as AppType from '../actions/ActionTypes'

const initialState = {
	drinkJsonData : null ,
	cartList : [],
	userData : null,
	usridx : null
}

const drinkListUpdate = (state, drinkListData) => {
	return {
		...state,
		drinkJsonData : {
		  ...drinkListData
		}
	};
}

const cartListUpdate = ( state, cartListData) => {
	return {
		...state,
		cartList : [
		  ...cartListData
		]
	};
}


const cartListDelete = ( state, code) => {
	//받은 아이디를 배열 형태의 객체에서 필터로 찾아 
	//새로운 배열을 만든뒤 state에 적용
	function newCartList(obj) {
		if (obj.code !== code ) {
			return true
		}
	};

	const coll = state.cartList.filter(newCartList);

	return {
		...state,
		cartList : [
			...coll
		]
	};

}

const updateTocartListData = ( state, idx, qty) => {
	
	var arr = state.cartList
	arr[idx].qty = qty

	return {
		...state,
		cartList : [
			...arr
		]
	};
}

const loginSucess = ( state, userData , usridx) => {
	return {
		...state,
		userData : userData,
		usridx : usridx
	};
}



export default function reducer(state = initialState , action ){
  switch (action.type){
		case AppType.DRINK_LIST_UPDATE:
			return drinkListUpdate(state, action.drinkListData)
		case AppType.CART_LIST_UPDATE:
			return cartListUpdate(state, action.cartListData)
		case AppType.CART_LIST_DELETE:
			return cartListDelete(state, action.id)
		case AppType.CART_LIST_QTY_UPDATE:
			return updateTocartListData(state, action.idx, action.qty)	
		case AppType.LOGIN_SUCESS:
			return loginSucess(state, action.userData, action.usridx)	
		default :	
			return state;	
  }
}







