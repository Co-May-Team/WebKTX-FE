import { combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = () => combineReducers({});
export default rootReducer;
