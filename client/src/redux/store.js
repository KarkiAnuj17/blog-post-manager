import { configureStore } from '@reduxjs/toolkit';
import  userSlice  from './reducerSlices/userSlice'


const store = configureStore({
  reducer: {
    user : userSlice,
  },
});

export default store; 