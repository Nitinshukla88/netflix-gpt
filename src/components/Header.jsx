import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  addUserData,
  removeUserData,
} from "../utils/appStoreSlices/userDataSlice";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUserData({
            Uid: uid,
            Email: email,
            DisplayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUserData());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="bg-gradient-to-b from-black flex justify-between">
      <img src={LOGO} alt="logo" className="h-20 w-48 ml-28" />
      {user && (
        <div className="flex">
          <img
            src={user?.photoURL}
            alt="user-img"
            className="h-10 w-10 rounded-full mt-4"
          />
          <button className="bg-red-600 text-white font-bold px-3 h-12 m-3">
            Welcome {user?.DisplayName}
          </button>
          <button
            className="bg-red-600 text-white font-bold px-3 h-12 m-3"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
