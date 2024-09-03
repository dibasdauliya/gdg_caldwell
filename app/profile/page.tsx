'use client'

import React, { useEffect } from 'react'
import { useState } from 'react';
import SubPageLayout from '../components/sub-page-layout'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebaseDB } from '../utils/db';
import { useRouter } from 'next/navigation';
import { ProfileData } from '../utils/types';
import { doc, getDoc } from 'firebase/firestore';

export default function MyProfile() {
    const [user, userLoading, userErr] = useAuthState(auth);
    const router = useRouter()

    const [profileData, setProfileData] = useState<ProfileData>({
        firstname: user?.displayName?.split(" ")[0] || "",
        lastname: user?.displayName?.split(" ")[1] || "",
        email: user?.email || "",
        classyear: "",
        linkedin: "",
        github: "",
        major: "",
        bio: "",
      });

    useEffect(() => {
        const fetchUserData = async () => {
          if (user) {
            const userDocRef = doc(firebaseDB, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data() as ProfileData;
              setProfileData(userData);
            }
          }
        };
    
        fetchUserData();
      }, [user]);

      if (!user && !userLoading) {
        router.push('/sign-in')
        }

        if (userLoading) {
            return <p>Loading...</p>
        }
  return (
    <SubPageLayout>
        <div className="relative z-30">
        <h1 className="text-3xl font-bold mt-8">Profile

            <small>
                <button onClick={() => router.push('/profile/edit')} className="text-sm text-blue-500 hover:text-blue-600 ml-3">Edit</button>
            </small>
        </h1>

            <div className="my-6 space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.firstname}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.lastname}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Class Year</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.classyear}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.linkedin}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">GitHub</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.github}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Major</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.major}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <p className="mt-1 text-sm text-gray-900">{profileData.bio}</p>
            </div>
            </div>
        </div>

    </SubPageLayout>
  )
}
