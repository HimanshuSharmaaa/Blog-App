import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../../component/index";
import appwriteService from "../../appwrite/Config";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    try {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
          if (post) setPost(post);
        });
      } else navigate("/");
    } catch (error) {
      console.log("Pages :: EditPost :: getIndividualPost :: error ", error);
    }
  }, [slug, navigate]);

  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;