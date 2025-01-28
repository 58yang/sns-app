//ファイル名:post.js

import { supabase } from "../lib/supabase";

export const postRepository = {
  async create(content, useId) {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ content, user_id: useId }])
      .select();
    if (error != null) throw new Error(error.message);
    return data[0];
  },

  async find() {
    const { data, error } = await supabase
      .from("posts_view")
      .select("*")
      .order("created_at", { ascending: false });
    if (error != null) throw new Error(error.message);
    return data.map((post) => {
      return {
        ...post,
        userId: post.userId,
        userName: post.user_metadata.name,
      };
    });
  },
};
