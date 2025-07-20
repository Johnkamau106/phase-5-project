import React from "react";

const ChildCard = ({ child }) => (
  <div className="child-card">
    <img src={child.image} alt={child.name} className="child-image" />
    <h4>{child.name}</h4>
    <p><strong>Age:</strong> {child.age}</p>
    <p><strong>Home:</strong> {child.home}</p>
    <p><strong>Start Date:</strong> {child.startDate}</p>
    <p><strong>Progress:</strong> {child.progress}</p>
    <p><strong>Next Report:</strong> {child.nextReport}</p>
  </div>
);

export default ChildCard;