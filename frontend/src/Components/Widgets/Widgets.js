import React from 'react'
import "./Widgets.css"
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widgets() {
  return ( 
    <div className="widgets">
      <TwitterTimelineEmbed
        className="widgets__container"
        sourceType="profile"
        screenName="saurabhnemade"
        options={{ height: 600 }}
      />
    </div> 
    );
}

export default Widgets;