"use client";

import React, { useEffect, useState } from "react";
import SubPageLayout from "../components/sub-page-layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseDB } from "../utils/db";
import { collection, getDocs } from "firebase/firestore";

export default function AdminPage() {
  const [user, userLoading, userErr] = useAuthState(auth);

  const [pageData, setPageData] = useState({
    users: [],
    positions: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollectionRef = collection(firebaseDB, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const usersList = usersSnapshot.docs.map((doc) => doc.data());

        const applicationsCollectionRef = collection(
          firebaseDB,
          "applications"
        );
        const applicationsSnapshot = await getDocs(applicationsCollectionRef);
        const applicationsList = applicationsSnapshot.docs.map((doc) =>
          doc.data()
        );

        setPageData({
          // @ts-ignore
          users: usersList,
          // @ts-ignore
          positions: applicationsList,
        });
      } catch (error) {
        alert(`Error fetching data: ${error}`);
        // toast.error(`Error fetching data: ${error}`);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SubPageLayout className="relative z-30">
      <section>
        <h1>Signed up users</h1>

        {!user && userLoading && <p>Loading...</p>}

        <details open={false}>
          <summary>view all</summary>
          <pre className="max-w-4xl">
            {JSON.stringify(pageData.users, null, 2)}
          </pre>
        </details>
      </section>

      <section>
        <h1>Applied positions</h1>

        <pre className="max-w-4xl overflow-auto whitespace-pre-wrap">
          {JSON.stringify(pageData.positions, null, 2)}
        </pre>
      </section>
    </SubPageLayout>
  );
}
