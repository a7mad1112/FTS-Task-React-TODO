import React from "react";
import './relax-img.css'
import image from '../../imgs/relax2.svg'

const RelaxImg = () => {
  return (
    <div className="relax-img">
      <img src={image} alt="relax-img"/>
      <p>You don't have any tasks, just relax!</p>
    </div>
  );
};

export default RelaxImg;
