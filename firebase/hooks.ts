import { useState, useEffect } from "react";
import { onSnapshot, collection, DocumentData, doc, Unsubscribe } from "firebase/firestore";
import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { FirebaseContextObject } from "./types";
import { projectAuth, projectFirestore } from "./_firebaseClient";

function useInitFirebase() : FirebaseContextObject {
    const [user, setUser] = useState<User | null | undefined>(null)
    const [profile, setProfile] = useState<DocumentData | null | undefined>(null)
    const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null)

    const userSignIn = (email: string, password: string, onSuccess: () => void, onFailure: () => void) => {
        signInWithEmailAndPassword(projectAuth, email, password)
            .then((value) => {
                setUser(value.user)
                onSuccess()
            })
            .catch((error) => {
                onFailure()
            })
    }

    const userSignOut = () => {
      // unsubscribe?.()
      setUnsubscribe(null)
      setUser(null)
      signOut(projectAuth)
    }

    useEffect(() => {
      if (user === null || user === undefined) {
        setProfile(null)
        return () => {}
      }
      
      const target = doc(projectFirestore, 'userData', user.uid)
      const unsubscribeProfile = onSnapshot(target, (snapshot) => {
        setProfile(snapshot.data())
      })
      
      setUnsubscribe(() => unsubscribeProfile)
      return () => {
        unsubscribeProfile()
      }
    }, [user])
    

    return {
        user,
        profile,
        userSignIn,
        userSignOut
    }
}

export { useInitFirebase }