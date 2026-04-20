import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Stories({ token }) {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        async function fetchStories() {
            const data = await getDataFromServer(token, "/api/stories");
            setStories(data);
        }
        fetchStories();
    }, [token]);

    return (
        <div className="flex gap-4 bg-white border p-3 mb-6 overflow-x-auto">
            {stories.map((story) => (
                <div key={story.id} className="text-center">
                    <img
                        src={story.user.image_url}
                        className="w-14 h-14 rounded-full"
                    />
                    <p className="text-xs">{story.user.username}</p>
                </div>
            ))}
        </div>
    );
}