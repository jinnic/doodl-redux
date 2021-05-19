import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DoodleCard from "./DoodleCard";

const DoodleContainer = () => {
  const doodles = useSelector(state => state.doodle.all)
  const currentUser = useSelector(state => state.user.current)
  const page = useSelector((state) => state.doodle.page);
  const sliceStart = (page - 1) * 6;
  const sliceEnd = sliceStart + 6;
  
  

  const renderDoodle = () => {
    return doodles.slice(sliceStart, sliceEnd).map((doodle) => (
      <DoodleCard
        key={doodle.id}
        doodle={doodle}
        // renderExisting={this.props.renderExisting}
        // showEditCanvas={this.showEditCanvas}
        // handleUpdate={this.props.handleUpdate}
        // handleDelete={this.props.handleDelete}
        // match={this.props.match}
        // page={this.props.page}
        // doodle={doodle}
        // updateLike={this.props.updateLike}
        user={currentUser}
        // handleEditCanvasShow={this.props.handleEditCanvasShow}
      />
    ));
  };

  return (
    <div className="">
              {console.log(doodles)}
      <div className="flex-container">{renderDoodle()}</div>
    </div>
  );
};

export default DoodleContainer;
