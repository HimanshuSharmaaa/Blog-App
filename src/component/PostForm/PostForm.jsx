import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    try {
      console.log("userData :: ", userData);
      if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
        if (file) await appwriteService.deletePost(post.featuredImage);
        const dbPost = await appwriteService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
        if (file) {
          data.featuredImage = file.$id;
          const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id});
          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.log("Components :: PostForm :: ", error);
    }
  };

  const slugTransfrom = useCallback((value) => {
    if (value && typeof value === "string")
      return value.toLowerCase().replace(/ /g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransfrom(value.title));
        // setValue("slug", slugTransfrom(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [slugTransfrom, watch, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="leftPart">
        <Input
          label="title"
          placeholder="Enter title here.."
          className=""
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug"
          placeholder="Enter title to see slug.."
          className=""
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransfrom(e.currentTarget.value)),
              { shouldValidate: true };
          }}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          deafaultValue={getValues("content")}
        />
      </div>
      <div className="rightPart">
        <Input
          label="FeaturedImage"
          type="file"
          className=""
          accept="image/png , image/jpg , image/jpeg , image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className=""
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className=""
          {...register("status", { required: true })}
        />

        <Button type="submit" bgColor={post ? "green" : "grey"} className="">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;

// except a-z , A-z & digits(d) convert all of them into (-)
// if (value && typeof value === "string")
//   return value
//     .trim()
//     .toLowerCase()
//     .replace(/^[a-zA-Z\d\s]+/g, "-")
//     .replace(/\s/g, "-");
