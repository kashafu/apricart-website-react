import React from "react";

const Pagination = () => {
  return (
    <>
    <div className="row">
                  <div className="col-md-6">
                     <ul className="pagination m-0">
                        <li className="page-item disabled">
                           <a className="page-link" passHref="#"  aria-disabled="true">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" >1</a></li>
                        <li className="page-item"><a className="page-link">2</a></li>
                        <li className="page-item"><a className="page-link" >3</a></li>
                        <li className="page-item">
                           <a className="page-link">Next</a>
                           {/* <a className="page-link" onClick={incrementCount}>Next</a> */}
                        </li>
                     </ul>
                  </div>
                  <div className="col-md-6">
                     <p className="text-right mb-0 mt-1">Showing 1 to 12 of 12 (1 Pages)</p>
                  </div>
               </div>
    </>
  );
};

export default Pagination;
