import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePage, setTotalPages, setDoodles } from '../slices/doodleSlice'
import { updatePagination } from '../api/doodleFetch'

const Pagination = props => {
    const page = useSelector(state => state.doodle.page)
    const totalPages = useSelector(state => state.doodle.totalPages)
    const dispatch = useDispatch();

    const handleChangePage = (num) => {
        if (page + num >= 1) {
            dispatch(updatePage(num))
            console.log(page)
            updatePagination(page)
            .then((data) => {
                dispatch(setDoodles(data))
              });
        //   this.setState({ loading: true });
        }
      };
    
    //   updatePagination = (page) => {
    //     fetch(`https://doodl-api.herokuapp.com/doodles/?page=${page}`)
    //       .then((r) => r.json())
    //       .then((data) => {
    //         this.setState({ doodles: data.doodles, totalPages: data.total_pages });
    //         this.setState({ loading: false });
    //       });
    //   };
    

    return (
        <div className="pagination-container">
            <button className={"pg-button pg-left " + (page === 1 ? "disabled" : "")} onClick={() => handleChangePage(-1)}>➜</button>
            <button className={"pg-button " + (page === totalPages ? "disabled" : "")} onClick={() => handleChangePage(+1)}>➜</button>
        </div>
      );
}
export default Pagination