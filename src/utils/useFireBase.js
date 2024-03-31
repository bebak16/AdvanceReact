import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDc6_gsMfh4Cf8wvZq2vc_pBzkqh1m5ypU",
  authDomain: "image-gen-ai-8063a.firebaseapp.com",
  databaseURL: "https://image-gen-ai-8063a-default-rtdb.firebaseio.com",
  projectId: "image-gen-ai-8063a",
  storageBucket: "image-gen-ai-8063a.appspot.com",
  messagingSenderId: "340548083956",
  appId: "1:340548083956:web:a29a8120a00dde0441bea1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const useFireBase = (props) => {
  const [data, setData] = useState([]);
  const dataTable = props === "logs" ? "logs" : "notes";

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(getDatabase(app));

      get(child(dbRef, dataTable))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("data comes", snapshot.val());
            const dbData = snapshot.val()?.dataList;
            setData(dbData);
          } else {
            console.log("no data error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  const updateList = async (dataList) => {
    const db = getDatabase(app);
    try {
      await set(ref(db, `${dataTable}/`), { dataList });
    } catch (error) {
      console.error("Error writing data:", error);
    }
  };

  return { data, updateList };
};

export default useFireBase;
