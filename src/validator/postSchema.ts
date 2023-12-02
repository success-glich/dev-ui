import vine from "@vinejs/vine";

export const postSchema = vine.object({
  title: vine.string().minLength(10).maxLength(50),
  description: vine.string().minLength(20).maxLength(1000),
  image: vine.string(),
  user_id: vine.string(),
});
