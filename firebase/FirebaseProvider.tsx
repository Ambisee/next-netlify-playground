import { useContext, createContext, ReactNode } from "react";

import { useInitFirebase } from "./hooks";
import { FirebaseContextObject } from "./types";

const FirebaseContext = createContext<FirebaseContextObject>({} as FirebaseContextObject)

export function useFirebase() {
    return useContext(FirebaseContext)
}

export default function FirebaseProvider(props: {children: ReactNode}) {
    const firebase = useInitFirebase()

    return (
        <FirebaseContext.Provider value={firebase}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
