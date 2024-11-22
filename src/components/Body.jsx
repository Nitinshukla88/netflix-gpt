import React, { useEffect } from 'react'
import Header from './Header'
import Login from './Login'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUserData, removeUserData } from '../utils/appStoreSlices/userDataSlice';

const Body = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName } = user;
        dispatch(addUserData({Uid : uid, Email : email, DisplayName : displayName}));
      } else {
        dispatch(removeUserData());
      }
    });
  }, [])
  return (
    <div>
        <Header/>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_large.jpg" alt="bg-imgae" className="absolute top-0 left-0 -z-20 bg w-full h-full"/>
        <div class="absolute inset-0 bg-black opacity-50 -z-10"></div>
        <Login/>
    </div>
  )
}

export default Body