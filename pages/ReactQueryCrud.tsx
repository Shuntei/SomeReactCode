import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { log } from "node:console";
import React, { useState } from "react";

const fetchPosts = async (search = "") => {
  // await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("fetch Data, 測試快取用");
  const res = await axios.get("http://localhost:3001/community/posts");
  const data = await res.data;
  const { totalPostsRows } = data;
  console.log(totalPostsRows);

  // 使用搜尋字串過濾資料
  if (search) {
    return totalPostsRows.filter((v) => v.title.includes(search));
  }

  return totalPostsRows;
};

const addPost = async (formData) => {
  const res = await axios.post(
    "http://localhost:3001/community/psadd",
    formData
  );
  // return res.data; // 返回新增的文章數據
};

const deletePost = async (id) => {
  const res = await axios.delete(`http://localhost:3001/community/${id}`);
};

const editPost = async (idAndData) => {
  const { id, updateData } = idAndData;
  console.log("有編輯id", id);
  console.log("也有編輯資料", updateData);

  const res = await axios.put(
    `http://localhost:3001/community/edit/${id}`,
    updateData
  );
};

export default function ReactQueryCrud() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photo: "",
    boardId: "5",
    userId: "10",
    emotion: "",
    tags: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    // e.preventDefault();
    setSearchTerm(e.target.value); // 每次輸入時更新搜尋字串
  };

  // 直接用data或是放一個其他名稱如post都行;
  const { data: post, isLoading } = useQuery({
    queryFn: () => fetchPosts(searchTerm),
    queryKey: ["posts", searchTerm],
    staleTime: Infinity,
  });

  const { mutateAsync: createPost } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutateAsync: removePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const { mutateAsync: updatePost } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      alert("編輯成功");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>資料加載失敗</div>;

  return (
    <main>
      <div>
        {" "}
        <h1>RQ練習</h1>
        <h3>新增</h3>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          type="text"
          name="content"
          placeholder="content"
          onChange={handleChange}
          value={formData.content}
        />
        <button onClick={() => createPost(formData)}>SUBMIT</button>
      </div>
      <div>
        <h3>搜尋</h3>
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleSearchChange} // 每次輸入時更新搜尋字串
          placeholder="搜尋標題"
        />
      </div>

      <div>
        {post?.map((v) => (
          <div style={{ width: "600px" }} key={v.post_id}>
            <ul>
              <li>id:{v?.post_id || "沒有資料ㄚㄚㄚ"}</li>
              <li>標題: {v?.title || "沒有資料ㄚㄚㄚ"}</li>
              <li>內容: {v?.content || "沒有資料ㄚㄚㄚ"}</li>
              <li>{v?.posts_timestamp || "沒有資料ㄚㄚㄚ"}</li>
            </ul>
            <button onClick={() => removePost(v.post_id)}>刪除</button>
            {/* <button onClick={() => deletePost(v.post_id)}>刪除</button> //這個不會自己從新抓 */}
            <button
              onClick={async () => {
                await v.post_id;
                const idAndData = { id: v.post_id, updateData: formData };
                updatePost(idAndData);
              }}
            >
              編輯
            </button>
            <hr />
          </div>
        ))}
      </div>
    </main>
  );
}
