import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (auth, email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (auth, email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async (auth) => {
        setLoading(true);
        return signOut(auth)
    };

    const updateUser = (name, photo) => {

        setLoading(true)
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            return unsubscribe
        }
    }, [])


    const authInfo = { user, loading, createUser, signIn, logout, updateUser };

    return (
        <AuthContext.Provider value={authInfo}>

            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}