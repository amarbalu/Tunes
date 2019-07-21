import {combineReducers} from 'redux';

const initialState={
    loading:false
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