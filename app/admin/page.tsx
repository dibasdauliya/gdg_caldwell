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
        // const usersList = usersSnapshot.docs.map((doc) => doc.data());
        const usersList = usersSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));

        const applicationsCollectionRef = collection(
          firebaseDB,
          "applications"
        );
        const applicationsSnapshot = await getDocs(applicationsCollectionRef);
        const applicationsList = applicationsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          userData: usersList.find((user) => user.uid === doc.data().userId),
        }));

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
        <h1 className="font-bold text-2xl my-6">
          Applied positions: {pageData.positions.length}
        </h1>

        {/* <pre className="max-w-4xl overflow-auto whitespace-pre-wrap">
          {JSON.stringify(pageData.positions, null, 2)}
        </pre> */}

        <div className="space-y-4">
          {pageData.positions.map((user) => (
            <div
              key={user.userId}
              className="bg-gray-100 p-4 rounded-md space-y-2"
            >
              <h2 className="text-lg font-semibold">
                Position: {user.position}
              </h2>
              <p>
                Applied on{" "}
                {/* {new Date(user.createdAt.seconds * 1000).toLocaleDateString({
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} */}
                {new Date(user.createdAt.seconds * 1000).toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }
                )}
              </p>
              <p>{user.userId}</p>
              <p>
                <pre>{JSON.stringify(user.userData, null, 2)}</pre>
              </p>
              {/* <div>{getUserById(user.userId)}</div> */}
              <p>Status: {user.status}</p>
              <div>
                <p className="font-semibold">Why GDG?</p>
                <p>{user.whyGdg}</p>
              </div>
              <div>
                Position question
                <p className="font-semibold">
                  {user?.positionQues && Object.keys(user?.positionQues)[0]}
                </p>
                <p>
                  {user?.positionQues && Object.values(user?.positionQues)[0]}
                </p>
              </div>
              <p>Is term1 accepted? {user.terms1 ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-2xl mt-6 mb-4">
          Signed up users: {pageData.users.length}
        </h1>

        {!user && userLoading && <p>Loading...</p>}

        <div className="space-y-4">
          {pageData.users.map((user) => (
            <div key={user.email} className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold">
                {user.firstname} {user.lastname}
              </h2>
              <p>{user.bio}</p>
              <p>
                {user.email} | {user.classyear}
              </p>
              <p>{user.major}</p>
            </div>
          ))}
        </div>

        {/* <details open={false}>
          <summary>view all</summary>
          <pre className="max-w-4xl">
            {JSON.stringify(pageData.users, null, 2)}
          </pre>
        </details> */}
      </section>
    </SubPageLayout>
  );
}
