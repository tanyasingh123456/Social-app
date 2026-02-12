import React from "react";

function PostCard({ post, onLike, loading }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mt-6 transition-all duration-300 hover:shadow-lg">

        <p className="text-gray-800 text-[15px] leading-relaxed mb-6 break-words whitespace-pre-wrap">
          {post.content}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-5">

          <button
            onClick={() => onLike(post._id)}
            disabled={loading}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${
              post.isLiked
                ? "bg-red-500 text-white hover:bg-red-600 active:scale-95"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95"
            }
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {post.isLiked ? "Unlike" : "Like"}
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-red-500 text-base"></span>
            <span className="font-semibold text-gray-800">
              {post.likeCount}
            </span>
            <span className="text-gray-500">Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;