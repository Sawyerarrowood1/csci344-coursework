import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Profile({ token }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const data = await getDataFromServer(token, "/api/profile");
            setProfile(data);
        }
        fetchProfile();
    }, [token]);

    if (!profile) return null;

    return (
        <div className="flex items-center gap-3 mb-6">
            <img
                src={profile.image_url}
                className="w-12 h-12 rounded-full"
            />
            <p className="font-bold">{profile.username}</p>
        </div>
    );
}