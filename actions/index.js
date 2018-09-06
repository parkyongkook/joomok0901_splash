import * as AppType from './ActionTypes';

export function drinkListUpdate(drinkListData){
	return {
		type : AppType.DRINK_LIST_UPDATE,
		drinkListData : drinkListData
	}
}

export function cartListUpdate(cartListData){
	return {
		type : AppType.CART_LIST_UPDATE,
		cartListData : cartListData
	}
}

export function cartListDelete(id){
	return {
		type : AppType.CART_LIST_DELETE,
		id : id
	}
}

export function updateTocartListData( idx, qty ){
	return {
		type : AppType.CART_LIST_QTY_UPDATE,
		idx : idx,
		qty : qty
	}
}

export function loginSucess(userData , usridx){
	return {
		type : AppType.LOGIN_SUCESS,
		userData : userData,
		usridx : usridx,
	}
}
















