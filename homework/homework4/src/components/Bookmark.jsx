import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function Bookmark({ token, bookmarkId, postId, refreshPosts }) {

    async function createBookmark() {
        await postDataToServer(token, "/api/bookmarks/", {
            post_id: postId,
        });
        refreshPosts();
    }

    async function deleteBookmark() {
        await deleteDataFromServer(token, "/api/bookmarks/" + bookmarkId);
        refreshPosts();
    }

    if (bookmarkId) {
        return (
            <button onClick={deleteBookmark}>
                <i className="fas fa-bookmark"></i>
            </button>
        );
    } else {
        return (
            <button onClick={createBookmark}>
                <i className="far fa-bookmark"></i>
            </button>
        );
    }
}