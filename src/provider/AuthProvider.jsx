import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { auth } from "../services/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoader, setUserLoader] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserLoader(false);
            } else {
                setUser(null);
                setUserLoader(false);
            }
        })
        return () => unSubscribe();
    }, [])

    console.log('AuthContext: ', user);



    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const logOut = () => {
        return signOut(auth);
    }

    return <AuthContext.Provider value={{
        user,
        userLoader,
        googleLogin,
        createUser,
        loginUser,
        updateUser,
        logOut
    }}>
        {children}
    </AuthContext.Provider>
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export default AuthProvider;