import React, { useContext, createContext, useState, useEffect } from 'react'
/*   Firebase Auth  +  REACT CONTEDT
파이어베이스 웹앱을 사용한 데이타 사용방법 
1. firebase 웹페이지에서 웹 앱 등록 --> 밑에 코드들을주면 이곳에 옮겨옴
2. webpack사용한다면, 다운받아서 사용 npm install --save firebase
아님 <script>태그 버전 사용
*/
import { initializeApp } from "firebase/app";
// auth 인증, 가입, 로그인, 로그아웃, ...
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, 
    signOut, sendPasswordResetEmail} from "firebase/auth";
// get파이어스토어  // firestore 데이타베이스 상품정보 가져오는 함수
// 데이터 추가는 addDoc // 데이터 읽기는 getDocs // 하나의데이타읽기 doc //  setDoc // updateDoc...
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore/lite';

// Initialize Firebase   // 전체 파이어베이스 앱  사용 
const app = initializeApp({
    apiKey: "AIzaSyASQMcq6WdcvaB0j3A2OdZu5tRUs9P-GRM",
    authDomain: "noteprojec-53357.firebaseapp.com",
    databaseURL: "https://noteprojec-53357-default-rtdb.firebaseio.com",
    projectId: "noteprojec-53357",
    storageBucket: "noteprojec-53357.appspot.com",
    messagingSenderId: "857471769116",
    appId: "1:857471769116:web:aa5862d8e6c8cec4169dd9",
    measurementId: "G-V642MBF0YT"
});

//const app = initializeApp(firebaseConfig); 
const auth = getAuth(); // 유저관리, 인증 정보 사용
const db = getFirestore(app); // firestore 데이타베이스를 사용하기위해  와 app을 연결 

//-----------------------------------------------------------------------------------------------------
const AuthContext = createContext()

//export const useContextAuth = useContext()
export function useContextAuth() { //  context 사용하기함수 
    return useContext(AuthContext)
}

// App > AuthProvider > Context.Provirder > children---------------------------------------------------------
export function AuthProvider({ children }) { // children = props = 하위컴포넌트들 
    const [loading, setLoading] = useState(true);
    // const [productData, setproductData] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    // 로딩을 만들어주는 이유는 setCurrentUser(user)가 정보를 받아오는걸 기다렷다가 렌더링 될수있게 해줌.
    // 만약 로딩이 없다면 정보를 받아오지 못했는데 렌더링이 먼저되서 에러 
    // 회원가입   --------------------------------------------------------
    function signupFunc(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 가입성공
                const user = userCredential.user;
            })
            .catch((error) => { // 가입실패
                const errorMessage = error.message;
                console.log('가입실패' + errorMessage)
            });
    }
    // 로그인 ---------------------------------------------------------------
    function signinFunc(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => { // 로그인 성공 
                const userrr = userCredential.user; // 유저정보
                //console.log(userrr) // {providerId: "firebase", email: "weq@yahoo.com", emailVerified: false, isAnonymous: false, tenantId: null, providerData: Array(1), …}
            })
            .catch((error) => {
                const errorMessage = error.message;
                //alert('없는 아이디 혹은 패스워드 입니다.')
                //console.log(errorMessage) // 너무틀리면 이렇게됨 Firebase: Access to this account has been temporarily disabled due to many failed login attempts.
            });
    }
    // 로그아웃-----------------------------------------------------------------
    // 로그아웃 사용시 주의점. 리액트의 이상한점인데. logout함수가 발동해서 해당 유저의 정보가 없어졌는데. 
    // 리액트가 렌더링을 한번더 하면서 해당컴포에있는 currentUser.email의 정보가 없다고. 에러를줌.
    // 해결방법 privateRoute로 이동시킴 
    function logoutFunc() {
        signOut(auth).then(() => {
            // Sign-out successful.  // 이곳에다가 링크를 바꿔서 컴포넌트를 바꿔봤지만 다 소용없음. 에러뜸.
        }).catch((error) => {
            // An error happened.
        });
    }

    // 비밀번호 재설정 이메일 보내기 ------------------------------------------------------------
    function resetPassword(email) {
        sendPasswordResetEmail(auth, email)
    }

    // 이곳 AuthProvider컴포넌트 렌더링시 / 가장먼저, *현재 유저 정보를 파이어베이스에서 불러오고, 현재 currentUser상태를 state에 저장. 
    useEffect(() => {
        console.log('authState 감지 발동')
        onAuthStateChanged(auth, (user) => {
            if (user) { // 현재 유저 상태가 로그인 상태라면
                // console.log(user)  // {providerId: "firebase", email: "yki0056@gmail.com", ...}
                setCurrentUser(user)
                setLoading(false)
            } else { // 현재 유저 상태가 logout 상태라면 
                // console.log(user) //  null
                setCurrentUser(user)
                setLoading(false)
            }
        })
    }, [auth])

    // db, collection, getDocs > product.js에서 사용중  
    // currentUser, logoutFunc > Userinfo.js  
    const value = { currentUser, signupFunc, signinFunc, logoutFunc, resetPassword, db, collection, getDocs }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children /*로딩이 false일때만 모든자식컴포들 보이게함*/}
        </AuthContext.Provider>
    )
}


    /*
    // 서버에서 정보 가져오기 
        async function testFunc() {
            const testing = await getDocs(collection(db, 'product'));
            const testList = testing.docs.map(doc => doc.data());
            // console.log(testList) // [{...},{...},{...}]
    
            const gameRef = doc(db, 'product', 'pd1');
            const gameSnap = await getDoc(gameRef)
            const gameData = gameSnap.data() // {name: 'Airforce100', price: 80, id: 34, quantityLeft: 3, img: 'https://firebase...}
        }
        testFunc()
    */
