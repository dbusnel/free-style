"use client"

import "../../style/profile-styles.css";
import React from "react";
import ImageSlider from "./ImageSlider.js";
import CommentSection from "./CommentSection";

/**
 * PROPS:
 *  - name: the name of the user
 *  - bio: the bio to display
 *  - images: an array of image URLs to display
 */
export default function ProfileView(props) {
    return (
        <div className="profile-view-container outline-container">
            <h1>{props.name ? props.name : "Upload images to preview!"}</h1>
            <p>{props.bio}</p>
            {props.images && <ImageSlider bio={props.bio} images={props.images} />}
            <CommentSection />
        </div>
    );
}