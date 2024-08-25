import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/Config";
import { Button, Container } from "../../component/index";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

const Post = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  const userData = useSelector((state) => state.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        post ? setPost(post) : navigate("/");
      }).catch((err) => {
        console.log("Error occur in fetching individual post ", err);
      });
    } else {
      console.log("slug is not available");
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (error) {
      console.log("Pages :: Post :: deletePost :: error", error);
    }
  };

  // const handleEdit = () => {
  //   navigate(`edit-post/${post.$id}`);
  // }

  return post ? (
    <div>
      <Container>
        <div>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
          {isAuthor && (
            <div>
              {/* <Button onClick={handleEdit}>Edit</Button> */}
              <Link to={`edit-post/${post.$id}`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div>
          <h1>{post.title}</h1>
        </div>
        <div>{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;