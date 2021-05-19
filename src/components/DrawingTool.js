import React from "react";

export const randomColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

export const DrawingTool = props => {
  const {color, brushRadius, name, handleSave, handleToolState} = props
  return (
    <div className="tool-container">
      <section className="tools">
        <label>title:</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>handleToolState("name", e.target.value)}
        />
        <br></br>
        <label>brush:</label>
        <input
          className="brush-radius-input"
          type="number"
          value={brushRadius}
          onChange={(e) =>handleToolState("brushRadius", parseInt(e.target.value))}

        />
        <label>color:</label>
        <input
          className="brush-color-input align-middle"
          type="color"
          value={color}
          onChange={(e) =>handleToolState("color", e.target.value)}
        />
        <button
          className="random-button"
          onClick={() =>handleToolState("random", randomColor())}

        >
          random
        </button>
      </section>
      <button
        className="save-button"
        onClick={handleSave}
        data-dismiss="modal"
      >
        save
      </button>
    </div>
  );
}
