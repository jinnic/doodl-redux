import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePage,
  setDoodles,
  setUserDoodles,
} from "../slices/doodleSlice";
import { setLoadingTrue, setLoadingFalse } from "../slices/loadingSlice";
import store from "../store";

const Pagination = ({ totalPages, isProfile, updatePagination }) => {
  const page = useSelector((state) => state.doodle.page);
  const currentUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();

  const handleChangePage = (num) => {
    if (page + num >= 1) {
      dispatch(updatePage(num));

      if (num > 0) {
        dispatch(setLoadingTrue());
        const updatedPage = store.getState().doodle.page;
        updatePagination(updatedPage, currentUser.id)
          .then((data) => {
            if (isProfile) {
              dispatch(setUserDoodles(data));
            } else {
              dispatch(setDoodles(data));
            }
          })
          .then(() => dispatch(setLoadingFalse()));
      }
    }
  };

  return (
    <div className="pagination-container">
      <button
        className={"pg-button pg-left " + (page === 1 ? "disabled" : "")}
        onClick={() => handleChangePage(-1)}
      >
        ➜
      </button>
      <button
        className={"pg-button " + (page === totalPages ? "disabled" : "")}
        onClick={() => handleChangePage(+1)}
      >
        ➜
      </button>
    </div>
  );
};
export default Pagination;
