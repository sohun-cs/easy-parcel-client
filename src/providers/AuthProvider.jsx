import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        setLoading(true);
        return signOut(auth).then(() => setUser(null));
    };

    const updateUser = (name, photo, email, role) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
            email: email,
            role: role
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false);
            setUser(currentUser);
        });
        return () => {
            return unsubscribe();

        }
    }, [])


    const authInfo = { user, setUser, loading, createUser, signIn, logout, updateUser };

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