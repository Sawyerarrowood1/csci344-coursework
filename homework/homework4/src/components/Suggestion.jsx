import React from "react";

export default function Suggestion({ user }) {
    return (
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <img
                    src={user.image_url}
                    className="w-8 h-8 rounded-full"
                />
                <div>
                    <p className="font-bold text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500">suggested for you</p>
                </div>
            </div>
            <button className="text-blue-500 text-sm">follow</button>
        </div>
    );
}