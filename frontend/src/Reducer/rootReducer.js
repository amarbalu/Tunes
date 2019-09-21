import {combineReducers} from 'redux';

const initialState={
    loading:false,can_proceed:false
}
const musicInitialState={
    metadata:null
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
       case 'LOADING_ACTION': 
       return {
           loading:action.loading 
       }
       
       case 'LOGIN_AUTH':
           return{
            can_proceed:action.can_proceed
           }
       default: return state
    }
 }

 const musicReducer = (state = musicInitialState, action) => {
    switch (action.type) {
       case 'LOAD_MUSIC': 
       return {
        metadata:action.metadata 
       }
       
       default: return state
    }
 }
const rootReducer=combineReducers({
    loginReducer,
    musicReducer
})

 export default rootReducer;