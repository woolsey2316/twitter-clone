import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Feed from '../Feed/Feed'
import Widgets from '../Widgets/Widgets'
import "./Home.css"

function Home() {
    return ( 
        <div className="home">
            <Sidebar />
            <Feed />
            <Widgets></Widgets>
        </div>
     );
}

export default Home;