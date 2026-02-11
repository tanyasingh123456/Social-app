import { useState } from "react";
import API from "../api/Api";

function PostForm({ onAddPost }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      const res = await API.post("/posts", { content });

      onAddPost({
        ...res.data,
        likeCount: 0,
        isLiked: false,
      });

      setContent("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mt-6 transition-all duration-300 hover:shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Create Post
        </h2>

        <textarea
          maxLength={280}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full min-h-[120px] p-4 border border-gray-300 rounded-xl text-sm text-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          resize-none break-words whitespace-pre-wrap transition-all"
        />

        <div className="flex items-center justify-between mt-5">
          <span
            className={`text-sm font-medium ${
              content.length > 250 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {content.length}/280
          </span>

          <button
            disabled={loading}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200
            ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            } text-white shadow-sm`}
          >
            {loading ? "Posting..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;