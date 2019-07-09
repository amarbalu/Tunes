import {combineReducers} from 'redux';

const initialState={
    loading:false
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
const rootReducer=combineReducers({
    loginReducer
})

 export default rootReducer;