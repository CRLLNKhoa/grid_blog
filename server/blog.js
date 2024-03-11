"use server";
import createSupabaseServerClient from "@/server/supabase";
import { auth } from "@clerk/nextjs";

export async function addBlog({ title, uid, tag, content }) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("blog")
      .insert([{ title, uid, tag, content }])
      .select();
    if (error) {
      return { status: 400, data: error };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}

export const getBlogs = async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    if (!userId) {
      console.log("Chưa đăng nhập!");
    }
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("uid", userId.slice(-6));

    if (error) {
      console.log(error);
    }
    return data;
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};

export const deleteBlogs = async (id) => {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    if (!userId) {
      console.log("Chưa đăng nhập!");
    }
    const { data, error } = await supabase.from("blog").delete().eq("id", id);

    if (error) {
      console.log(error);
    }
    return { status: 200, message: "Xóa bài viết thành công!" };
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};

export const getDashBoard = async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    if (!userId) {
      console.log("Chưa đăng nhập!");
    }
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("uid", userId.slice(-6));
    const { data: dataview } = await supabase
      .from("cmt")
      .select("uid")
      .eq("uid", userId.slice(-6));
    if (error) {
      console.log(error);
    }
    return {
      countBlog: data?.length,
      like: data?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.like;
      }, 0),
      view: data?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.view;
      }, 0),
      countCmt: dataview?.length,
    };
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};

export const updateBlogs = async (id, newData) => {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    if (!userId) {
      console.log("Chưa đăng nhập!");
    }
    const { data, error } = await supabase
      .from("blog")
      .update({"title": newData.title,"content": newData.content,"tag": newData.tag})
      .eq("id", id)
      .select("*");

    if (error) {
      console.log(error);
    }
    return { status: 200, message: "Cập nhật bài viết thành công!", data: data };
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};

export const updateStatusBlogs = async (id, newData) => {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    if (!userId) {
      console.log("Chưa đăng nhập!");
    }
    const { data, error } = await supabase
      .from("blog")
      .update(newData)
      .eq("id", id)
      .select("*");

    if (error) {
      console.log(error);
    }
    return { status: 200, message: "Cập nhật bài viết thành công!", data: data };
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};


export const getDetailBlog = async (id) => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log(error);
    }
    return {status: 200, data: data}
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};

export const view = async (id) => {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    if (!userId) {
      console.log("Chưa đăng nhập!");
    }
    const { error } = await supabase
      .rpc('increment', {row_id: id })
      .select("*");

    if (error) {
      console.log(error);
    }
    return { status: 200, message: "Cập nhật bài viết thành công!",};
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};

export const getBlogsPage = async (id) => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("uid", id.slice(-6));

    if (error) {
      console.log(error);
    }
    return data;
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};