import React from 'react'
import "./SidebarOption.css";

function SidebarOption(props) {
    const { text, Icon, active } = props;
    return (
        <div className={`sidebar-option ${active ? "sidebar-option__active" : ""}`}>
            <Icon className="sidebar-option__icon"/>
            <h2>{text}</h2>
        </div>
    )
}

export default SidebarOption;