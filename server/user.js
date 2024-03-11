"use server";
import { auth, clerkClient } from "@clerk/nextjs";
import createSupabaseServerClient from "@/server/supabase";

export async function getInfo() {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    const { data, error } = await supabase
      .from("info")
      .select()
      .eq("uid", userId.slice(-6));
    if (error) {
      return { status: 400, data: error };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}

export async function addInfo({ name, link }) {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    const { data, error } = await supabase
      .from("info")
      .insert([{ name, uid: userId.slice(-6), link }])
      .select();
    if (error) {
      return { status: 400, data: error };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}

export async function updateInfo(dataUpdate) {
  try {
    const supabase = await createSupabaseServerClient();
    const { userId } = auth();
    const { data, error } = await supabase
      .from("info")
      .update(dataUpdate)
      .eq("uid", userId.slice(-6))
      .select();
    if (error) {
      return { status: 400, data: error };
    } else return { status: 200, data: data };
  } catch (error) {
    console.log(error);
  }
}

export const getUser = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      console.log("Chưa đăng nhập!");
    }
    return userId.slice(-6);
    // return user;
  } catch (error) {
    console.log("Lấy thông tin bị lỗi!", error);
  }
};

export async function getInfoBlog(id) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("info").select().eq("uid", id);
    const { data: dataList, error: errorList } = await supabase
      .from("blog")
      .select("tag")
      .eq("uid", id);
    if (errorList) {
      return { status: 400 };
    } else {
      // Mảng để lưu trữ các loại tag duy nhất
      var uniqueTags = [];
      // Lặp qua mảng và thêm các loại tag mới vào mảng uniqueTags
      dataList?.forEach(function (item) {
        var tag = item.tag;
        if (!uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
      });
      // Đếm tổng số loại tag
      var totalUniqueTags = uniqueTags.length;
      return {
       "status": 200,
        "name": data[0]?.name,
        "link": data[0]?.link,
        "posts": dataList?.length,
        "tag": totalUniqueTags
      };
    }
  } catch (error) {
    console.log(error);
  }
}
