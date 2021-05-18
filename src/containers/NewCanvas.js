import { useState } from "react"
import { useSelector, useDispatch} from "react-redux"
import { setModalFalse } from "../slices/modalSlice";

import CanvasDraw from "react-canvas-draw";
import Modal from "react-bootstrap/Modal";
import { Popover, OverlayTrigger } from "react-bootstrap/";


const NewCanvas = () =>{
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(400);
  const [doodle, setDoodle] = useState({});
  const [color, setColor] = useState('#672DAC');
  const [brushRadius, setBrushRadius] = useState(5);
  const [name, setName] = useState('masterpiece name')
  const modalStatus = useSelector(state => state.modal.show)
  const dispatch = useDispatch()

  const handleToolState = (type, value) => {
    switch (type) {
      case "name":
        setName(value);
        break;
      case "brushRadius":
        setBrushRadius(value);
        break;
      case "color":
        setColor(value)
        break;
      case "random":
        setColor(value)
        break;
    }
  };

  const popover = (
    <Popover className="popover-basic">
      <Popover.Content>
        <button
          className="delete-button"
          // onClick={() => this.saveableCanvas.clear()}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-trash-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
            />
          </svg>
        </button>
      </Popover.Content>
    </Popover>
  );

  return(
    <Modal
        show={modalStatus}
        onHide={()=>dispatch(setModalFalse())}
        scrollable={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="doodle-modal"
      >
        <Modal.Header closeButton className="">
          <section className="clear-undo">
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
              <button className="button">clear</button>
            </OverlayTrigger>
            {/* <button
              className="button undo"
              onClick={() => this.saveableCanvas.undo()}
            >
              undo
            </button> */}
          </section>
        </Modal.Header>
        <Modal.Body>
          <CanvasDraw
            className="doodle-canvas"
            hideGrid
            // ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
            brushColor={color}
            brushRadius={brushRadius}
            lazyRadius={0}
            canvasWidth={500}
            canvasHeight={400}
          />
          {/* <DrawingTool
            tool={this.state.tool}
            handleSave={this.handleSave}
            handleToolState={this.handleToolState}
          /> */}
        </Modal.Body>
      </Modal>
  )

}

export default NewCanvas;