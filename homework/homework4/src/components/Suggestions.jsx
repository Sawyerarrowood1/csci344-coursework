import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion";

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        async function fetchSuggestions() {
            const data = await getDataFromServer(token, "/api/suggestions");
            setSuggestions(data);
        }
        fetchSuggestions();
    }, [token]);

    return (
        <div>
            <p className="text-gray-500 font-bold mb-3">
                Suggestions for you
            </p>

            {suggestions.map((user) => (
                <Suggestion key={user.id} user={user} />
            ))}
        </div>
    );
}