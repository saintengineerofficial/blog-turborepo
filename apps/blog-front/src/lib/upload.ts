import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const url = process.env.SUPABASE_URL!;
  const apiKey = process.env.SUPABASE_API_KEY!;

  const supabase = createClient(url, apiKey);

  const data = await supabase.storage.from("avatar").upload(`${image.name}_${Date.now()}`, image);
  if (!data.data?.path) throw new Error("failed to upload the file");

  const urlData = await supabase.storage.from("avatar").getPublicUrl(data.data?.path);

  return urlData.data.publicUrl;
}
