import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"
import {
  doc,
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD3Vooq3fM_algtA06P5yz9JG6yZb-9E2Q",
  authDomain: "aggie-heroes.firebaseapp.com",
  projectId: "aggie-heroes",
  storageBucket: "aggie-heroes.appspot.com",
  messagingSenderId: "1024094835637",
  appId: "1:1024094835637:web:8b392f1abf926270e17ffc",
  measurementId: "G-HHQNF6604R",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

// Sign in methods
const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDocs(q)

    if (docs.docs.length === 0) {
      const result = await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
      return result
    }
  } catch (err) {
    throw new Error(err)
  }
}

const loginWithEmailandPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    throw new Error(err)
  }
}

// Registration
const registerWithEmailandPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (err) {
    throw new Error(err)
  }
}

// Password Reset
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
    // alert("Password reset link sent!")
    // return true
  } catch (err) {
    // console.error(err)
    // alert(err.message)
    return err.message
  }
}

// Signout
const logOut = () => {
  signOut(auth)
}

// Tutor
const registerTutor = async (
  userID,
  userSubject,
  afternoon,
  evening,
  morning
) => {
  await addDoc(collection(db, "tutors"), {
    user: userID,
    subject: userSubject,
    afternoon,
    evening,
    morning,
  })
}

const getAllTutoringForUser = async (userID) => {
  const q = query(collection(db, "tutors"), where("user", "==", userID))
  const querySnapshot = await getDocs(q)
  return querySnapshot
  // return await getDocs(collection(db, "tutors"), where("user", "==", userID))
}

const getAllRequestsForUser = async (userName) => {
  const q = query(
    collection(db, "tutor_requests"),
    where("forUser", "==", userName)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot
  // return await getDocs(collection(db, "tutors"), where("user", "==", userID))
}

const getAllRequestsFromUser = async (userID) => {
  const q = query(
    collection(db, "tutor_requests"),
    where("fromUser", "==", userID)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot
}

const removeTutorSpot = async (userID, subject) => {
  const q = query(
    collection(db, "tutors"),
    where("user", "==", userID),
    where("subject", "==", subject)
  )
  const querySnapshot = await getDocs(q)

  await querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref)
  })

  return
}

const getAllAvailableTutoringBySubject = async (subject) => {
  const q = query(collection(db, "tutors"), where("subject", "==", subject))
  const querySnapshot = await getDocs(q)
  return querySnapshot
}

const getAllAvailableTutoring = async () => {
  const q = query(collection(db, "tutors"))
  const querySnapshot = await getDocs(q)
  return querySnapshot
}

const sendTutoringRequest = async (userID, rowInfo) => {
  try {
    await addDoc(collection(db, "tutor_requests"), {
      fromUser: userID,
      subject: rowInfo.subject,
      forUser: rowInfo.user,
      morning: rowInfo.morning,
      afternoon: rowInfo.afternoon,
      evening: rowInfo.evening,
      confirmed: false,
    })
    // alert(
    //   "Success! Contacted tutor, please allow 48 hours for a response in your dashboard"
    // )
    return true
  } catch (err) {
    // console.error(err)
    // alert(err.message)
    return err.message
  }
}

// User
const getUserNameByUID = async (userID) => {
  let usersRef = collection(db, "users")
  const q = query(usersRef, where("uid", "==", userID))

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs[0].data().name
}

const getUIDByUsername = async (userName) => {
  let usersRef = collection(db, "users")
  const q = query(usersRef, where("name", "==", userName))

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs[0].data().uid
}

const getEmailByUsername = async (userName) => {
  let usersRef
  let q
  let querySnapshot
  try {
    usersRef = collection(db, "users")
    q = query(usersRef, where("name", "==", userName))

    querySnapshot = await getDocs(q)
  } catch (e) {}

  return querySnapshot.docs[0].data().email
}

const confirmTutoringRequest = async (requestData) => {
  try {
    let fromUID = await getUIDByUsername(requestData.fromUser)
    console.log("userID?", fromUID)
    const q = query(
      collection(db, "tutor_requests"),
      where("forUser", "==", requestData.forUser),
      where("fromUser", "==", fromUID),
      where("subject", "==", requestData.subject)
    )
    const querySnapshot = await getDocs(q)

    console.log("anything found? ", querySnapshot)
    let holding = {}
    let docID

    if (querySnapshot) {
      querySnapshot.forEach((entry) => {
        docID = entry.id
        holding = entry.data()
        return
      })

      holding.confirmed = true

      let updateRef = doc(db, "tutor_requests", docID)
      await updateDoc(updateRef, holding)
    }
    return
  } catch (err) {
    return err.message
  }
}

const denyTutoringRequest = async (requestData, userID) => {
  try {
    let fromUID = await getUIDByUsername(requestData.fromUser)
    console.log("userID?", fromUID)
    const q = query(
      collection(db, "tutor_requests"),
      where("forUser", "==", requestData.forUser),
      where("fromUser", "==", fromUID),
      where("subject", "==", requestData.subject)
    )
    const querySnapshot = await getDocs(q)

    console.log("anything found? ", querySnapshot)
    let holding = {}
    let docID

    if (querySnapshot) {
      querySnapshot.forEach((entry) => {
        docID = entry.id
        holding = entry.data()
        return
      })

      holding.confirmed = false

      let updateRef = doc(db, "tutor_requests", docID)
      await updateDoc(updateRef, holding)
    }
    return
  } catch (err) {
    return err.message
  }
}

export {
  auth,
  db,
  loginWithGoogle,
  loginWithEmailandPassword,
  registerWithEmailandPassword,
  sendPasswordReset,
  logOut,
  registerTutor,
  getAllTutoringForUser,
  removeTutorSpot,
  getAllAvailableTutoring,
  getUserNameByUID,
  sendTutoringRequest,
  getAllRequestsForUser,
  confirmTutoringRequest,
  denyTutoringRequest,
  getAllRequestsFromUser,
  getEmailByUsername,
}
