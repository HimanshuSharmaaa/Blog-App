import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/Config";
import { Container, PostCard } from "../../component/index";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setposts] = useState([]);
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    userData &&
      appwriteService.getAllPost().then((val) => {
        if (val) setposts(val.documents);
      });
  }, []);

  if (posts.length === 0 || posts.length < 1) {
    return (
      <div>
        <Container>
          <h1>Welcome in home Page</h1>
          <h2>Add some posts to look</h2>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <div>
          {posts.map((post) => (
            <div key={post.$id}>
              {/* pass post in spread from bracuse in postcard we destructure the values of the post. */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
