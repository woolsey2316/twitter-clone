import React from 'react'
import "./Post.css"
import {Avatar} from "@mui/material"

import { 
  MoreHoriz,
  ChatBubbleOutline,
  Repeat,
  FavoriteBorderOutlined,
  PublishOutlined 
} from "@mui/icons-material"

function Post() {
  return ( 
    <div className="post">
      <Avatar className="post__avatar"/>
      <div className="post__content">
        <div className="post__header">
          <h3>John Doe</h3>
          <h4>@johnDoe</h4>
          <MoreHoriz className="post__options"/>
        </div>
        <div className="post__descripton">
          Lorem ipsum dolor sit amet conectetur adipisicing elit. Perferendis 
          ipsam sed fuhit non balnditiis quam earum doloremque quibudam 
          totam maxime!
        </div>
        <div className="post__media">
          <img
          src='/images/dog.jpg'
          alt="tweet"
          ></img>
        </div>
        <div className="post__footer">
          <ChatBubbleOutline fontSize="small"/>
          <Repeat fontSize="small"/>
          <FavoriteBorderOutlined fontSize="small"/>
          <PublishOutlined fontSize="small"/>
        </div>
      </div>
    </div> 
    );
}

export default Post;