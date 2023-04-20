import React from 'react'
import { useRef, useState } from 'react';
import './toggle-side-bar.css'
const ToggleSideBar = () => {
  const togglerRef = useRef(null);
  const [isXNav, setIsXNav] = useState(false);
  // const dispatch = useDispatch();
  // const showUiNav = useSelector(state => state.navUi.navIsVisible)

  return (
    <div className="menu-icon-container">
      <div ref={togglerRef}
        className={`menu-icon`}
        onClick={() => {
          togglerRef.current.classList.toggle("menu-clicked")
          setIsXNav(!isXNav);
          // dispatch(navUiActions.toggle())
        }}
      >
        <span className="fade-left first-part w-50"></span>
        <span className="fade-right first-part w-50"></span>
        <span className={`toggler-1 sec-part ${isXNav ? 'x-nav' : null}`}></span>
        <span className={`toggler-2 sec-part ${isXNav ? 'x-nav' : null}`}></span>
        <span className="fade-left w-50 third-part"></span>
        <span className="fade-right w-50 third-part"></span>
      </div>
    </div>
  );
}

export default ToggleSideBar