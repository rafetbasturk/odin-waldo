import { collection, onSnapshot, query, orderBy, limit, startAfter } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./index";

const useFirestore = (reference, page = null) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const [isNext, setIsNext] = useState(true)

  const fetchNext = () => {
    setIsLoading(false)
    const next = query(collection(db, reference), orderBy("ms"), startAfter(lastVisible), limit(10));
    fetch(next)
  }
  const fetch = (ref) => {
    onSnapshot(ref, snapshot => {
      if (snapshot.size !== 10) setIsNext(false)
      const fetched = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      if (page) {
        setData(prev => [...prev, ...fetched])
      }
      else {
        setData([...fetched])
      }
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)


    let ref;
    page
      ? ref = query(collection(db, reference), orderBy("ms"), limit(10))
      : ref = collection(db, reference)

    fetch(ref)
    // eslint-disable-next-line
  }, [reference, page])

  return { isLoading, data, fetchNext, isNext }
}

export default useFirestore
