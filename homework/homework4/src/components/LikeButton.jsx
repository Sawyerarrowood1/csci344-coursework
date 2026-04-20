import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function LikeButton({ token, likeId, postId, refreshPosts }) {

    async function createLike() {
        await postDataToServer(token, "/api/likes/", {
            post_id: postId
        });
        refreshPosts();
    }

    async function deleteLike() {
        await deleteDataFromServer(token, "/api/likes/" + likeId);
        refreshPosts();
    }

    if (likeId) {
        return (
            <button onClick={deleteLike}>
                <i className="fas fa-heart text-red-600"></i>
            </button>
        );
    } else {
        return (
            <button onClick={createLike}>
                <i className="far fa-heart"></i>
            </button>
        );
    }
}