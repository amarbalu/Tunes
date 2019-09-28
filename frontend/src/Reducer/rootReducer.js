import {combineReducers} from 'redux';

const initialState={
    loading:false,can_proceed:false,loader:false
}
const musicInitialState={
    metadata:null
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
       case 'LOADING_ACTION': 
       return {
           ...state,
           loading:action.loading 
       }
       
       case 'LOGIN_AUTH':
           return{
               ...state,
            can_proceed:action.can_proceed
           }
           case 'LOADER_CARD':
                return{
                    ...state,
                 loader:action.loader
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