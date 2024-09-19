"use client";

import React, { useEffect, useState } from "react";
import SubPageLayout from "../components/sub-page-layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseDB } from "../utils/db";
import { collection, getDocs } from "firebase/firestore";

// Define types for user and application data
interface User {
  uid: string;
  firstname: string;
  lastname: string;
  bio: string;
  email: string;
  classyear: string;
  major: string;
  createdAt: { seconds: number; nanoseconds: number };
}

interface Application {
  userId: string;
  position: string;
  createdAt: { seconds: number; nanoseconds: number };
  status: string;
  whyGdg: string;
  positionQues?: { [key: string]: string };
  terms1: boolean;
  userData?: User;
}

interface PageData {
  users: User[];
  positions: Application[];
}

export default function AdminPage() {
  const [user, userLoading, userErr] = useAuthState(auth);

  const [pageData, setPageData] = useState<PageData>({
    users: [],
    positions: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollectionRef = collection(firebaseDB, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const usersList: User[] = usersSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        })) as User[];

        const applicationsCollectionRef = collection(
          firebaseDB,
          "applications"
        );
        const applicationsSnapshot = await getDocs(applicationsCollectionRef);
        const applicationsList: Application[] = applicationsSnapshot.docs.map(
          (doc) => ({
            ...doc.data(),
            userData: usersList.find((user) => user.uid === doc.data().userId),
          })
        ) as Application[];

        setPageData({
          users: usersList,
          positions: applicationsList,
        });
      } catch (error) {
        alert(`Error fetching data: ${error}`);
        // toast.error(`Error fetching data: ${error}`);
      }
    };

    fetchUserData();
  }, []);

  const convertUserDataToCSV = (userData?: User, position?: string) => {
    if (!userData || position?.toLowerCase().trim() === "member") return "";
    return `${userData.firstname.trim()},${userData.lastname.trim()},${userData.email.trim()}`;
  };

  const generateCSVContent = () => {
    const headers = "FirstName,LastName,Email\n";
    const rows = pageData.positions
      .map((application) =>
        convertUserDataToCSV(application.userData, application.position)
      )
      .filter((row) => row !== "")
      .join("\n");
    return headers + rows;
  };

  const downloadCSV = () => {
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "userdata.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SubPageLayout className="relative z-30">
      <section>
        <h1 className="font-bold text-2xl my-6">
          Applied positions: {pageData.positions.length}
        </h1>

        <div className="space-y-4">
          <button
            onClick={downloadCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Download CSV
          </button>

          {pageData.positions.map((application) => (
            <div>
              <pre>
                {convertUserDataToCSV(
                  application.userData,
                  application.position
                )}
              </pre>
            </div>
          ))}

          {pageData.positions.map((application) => (
            <div
              key={application.userId}
              className="bg-gray-100 p-4 rounded-md space-y-2"
            >
              <h2 className="text-lg font-semibold">
                Position: {application.position}
              </h2>
              <p>
                Applied on{" "}
                {new Date(application.createdAt.seconds * 1000).toLocaleString(
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
              <p>{application.userId}</p>
              <p>
                <pre>{JSON.stringify(application.userData, null, 2)}</pre>
              </p>
              <p>Status: {application.status}</p>
              <div>
                <p className="font-semibold">Why GDG?</p>
                <p>{application.whyGdg}</p>
              </div>
              <div>
                Position question
                <p className="font-semibold">
                  {application?.positionQues &&
                    Object.keys(application?.positionQues)[0]}
                </p>
                <p>
                  {application?.positionQues &&
                    Object.values(application?.positionQues)[0]}
                </p>
              </div>
              <p>Is term1 accepted? {application.terms1 ? "Yes" : "No"}</p>
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
      </section>
    </SubPageLayout>
  );
}
