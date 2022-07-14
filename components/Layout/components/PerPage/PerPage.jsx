import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import React, { useEffect, useState } from "react";

const baseURL ="https://stag.apricart.pk/v1";

export default function Header() {
  const [page, setPage] = useState();

  function inputData(e){
        e.preventDefault();
  } 

  return (
    <>
    <div className="row popular_head">
                        
                        <div className="col-md-2">
                           <div className="input-group cat_sort">
                             
                              <select className="form-control" id="" name="">
                                 <option value="">Sort By</option>
                                 <option value="">Name (A - Z)</option>
                                 <option value="">Name (Z - A)</option>
                                 <option value="">Price (Low &gt; High)</option>
                                 <option value="">Price (High &gt; Low)</option>
                                 <option value="">Rating (Highest)</option>
                                 <option value="">Rating (Lowest)</option>
                                
                              </select>
                           </div>
                        </div>
                        <div className="col-md-2">
                           <div className="input-group cat_show">

                              <select className="form-control" id="" name="">
                                 <option value="">15</option>
                                 <option value="">30</option>
                                 <option value="">45</option>
                                 <option value="">60</option>
                               
                              </select>
                           </div>
                        </div>
                     </div>
    </>
  );
}
