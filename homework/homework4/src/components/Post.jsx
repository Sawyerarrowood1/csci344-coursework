import React from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

export default function Post({ post, token, refreshPosts }) {
    return (
        <section className="bg-white border mb-10">
            <div className="p-4 flex justify-between">
                <h3>{post.user.username}</h3>
                <button>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
            </div>

            <img
                src={post.image_url}
                alt="post"
                className="w-full max-h-[600px] object-cover"
            />

            <div className="p-4">
                <div className="flex justify-between text-2xl mb-3">
                    <div className="flex gap-2">
                        <LikeButton
                            token={token}
                            likeId={post.current_user_like_id}
                            postId={post.id}
                            refreshPosts={refreshPosts}
                        />
                        <button><i className="far fa-comment"></i></button>
                        <button><i className="far fa-paper-plane"></i></button>
                    </div>

                    <BookmarkButton
                        token={token}
                        bookmarkId={post.current_user_bookmark_id}
                        postId={post.id}
                        refreshPosts={refreshPosts}
                    />
                </div>

                <p>{post.likes.length} likes</p>

                <p>
                    <strong>{post.user.username}</strong> {post.caption}
                </p>

                <p className="text-gray-500 text-sm">
                    {post.display_time}
                </p>
            </div>

            <div className="flex justify-between items-center p-3">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full mr-2"
                />
                <button>Post</button>
            </div>
        </section>
    );
}