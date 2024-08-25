import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/Config";

const PostCard = ({ $id, featuredImage, title }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="postCardConatiner">
        <div className="postCardImageContainer">
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title}/>
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;