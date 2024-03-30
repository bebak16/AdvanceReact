import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDc6_gsMfh4Cf8wvZq2vc_pBzkqh1m5ypU",
  authDomain: "image-gen-ai-8063a.firebaseapp.com",
  databaseURL: "https://image-gen-ai-8063a-default-rtdb.firebaseio.com",
  projectId: "image-gen-ai-8063a",
  storageBucket: "image-gen-ai-8063a.appspot.com",
  messagingSenderId: "340548083956",
  appId: "1:340548083956:web:a29a8120a00dde0441bea1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const useFireBase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
        const dbRef = ref(getDatabase(app));

          get(child(dbRef, `notes`)).then((snapshot) => {
            debugger;
            if (snapshot.exists()){
              console.log("data comes", snapshot.val());
              const dbData = snapshot.val()?.noteList;
             setData(dbData);
            }
            else {
              console.log("no data error");
            }
          }).catch((error) => {
            console.error(error);
          });
          setLoading(false);
        };
    fetchData();
  }, []);

  const updateList = async (noteList) => {
    const db = getDatabase(app);
    try {
      debugger;
      await set(ref(db, 'notes/'), { noteList });
      await alert("Data successfully saved");
    } catch (error) {
      console.error('Error writing data:', error);
    }
  };
  
  return { data, loading, updateList };
};

export default useFireBase;
