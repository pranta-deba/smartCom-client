import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { auth } from "../services/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [userLoader, setUserLoader] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                axiosPublic.post('/jwt', { email: currentUser.email })
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        setUserLoader(false);
                    }
                })
                setUser(currentUser);
            } else {
                setUser(null);
                setUserLoader(false);
                localStorage.removeItem('token');
            }
        })
        return () => unSubscribe();
    }, [axiosPublic])

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