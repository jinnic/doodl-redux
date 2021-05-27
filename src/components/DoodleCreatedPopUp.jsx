import React from "react";
import { useSelector } from "react-redux"
import { Transition } from "react-transition-group";

export default function DoodleCreatedPopUp() {
  const doodleAdded = useSelector(state => state.doodle.doodleAdded)
  const duration = 500;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0, display: `inline-block` },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: `none` },
  };
  return (
    <Transition in={doodleAdded} timeout={500}>
      {(state) => (
        <div
          className="doodle-added-notif"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          Doodl created!
        </div>
      )}
    </Transition>
  );
}
