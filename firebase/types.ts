import { User } from "firebase/auth"
import { DocumentData } from "firebase/firestore"

export interface FirebaseContextObject {
    user: User | null | undefined
    profile: DocumentData | null | undefined
    userSignIn: (email: string, password: string, onSuccess: () => void, onFailure: () => void) => void,
    userSignOut: () => void
}