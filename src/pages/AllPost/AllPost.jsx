import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../../component/index";
import appwriteService from "../../appwrite/Config";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let FetchAllPosts = async () => {
      try {
        const postData = await appwriteService.getAllPost();
        if (postData) {
          setPosts(postData.documents);
          console.log('Successfully Fetch All-posts :: All-posts');
        }
      } catch (error) {
        console.log("AllPost :: FetchAllPosts ::", error);
      }
    };
    FetchAllPosts();
  }, []);

  if (posts.length === 0) {
    return <div>Add Some posts to see here..</div>;
  }

  return (
    <div className="">
      <Container>
        <div>
          {posts.map((post) => (
            <div key={post.$id}>
            <PostCard key={post.$id} {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;