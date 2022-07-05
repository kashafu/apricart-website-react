import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Cookies from 'universal-cookie';

import Slider from "react-slick";
import Link from "next/link";
import { Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../Layout";
let base_url_api = "https://staging.apricart.pk/v1";

export default function Categories() {
  const { appState, handleAppState } = useContext(AppContext)
  const city = "karachi"; //city from popup
  //Peshawar
  const [users, setUsers] = useState([]);
  const cookies = new Cookies();

  const getPopularitems = async () => {
    const response = await axios.get(
      base_url_api + `/home/all?client_lat=24.8438858&client_long=67.1343959&city=karachi&lang=en&userid=abc123&web=false&hide=false&maker=ios&model=iphone6s&prod_type=cus&order_type=delivery&client_type=apricart`
    );
    
    setUsers(response.data.data.categories);
  };

  const hideSideDrawer = () => {
    handleAppState({
      "sideDrawerStatus": !appState.sideDrawerStatus
  })
  }
  useEffect(() => {
    getPopularitems();
  }, []);
  return (
    <div className="mobile-navigation">
      <strong className="title">Category</strong>

      <div className="sidebar">
        {users.map((category) => {
          return (
            <Dropdown key={category.id} className="dropdown1">
              <Dropdown.Toggle id="dropdown-basic">
               {category.childrenData.length > 1 && <i className="fas fa-plus"></i> }

                <Link href="/category/[id]" as={"/category/" + category.id} passHref>
                  <span onClick={category.childrenData.length == 0 && hideSideDrawer } className="forpadding"> {category.name}</span>
                </Link>
              </Dropdown.Toggle>
              {category.childrenData.map((sub) => {
                return (
                  <Dropdown.Menu key={sub.id}>
                    <Dropdown.Item>
                      <Link href="/category/[id]" as={"/category/" + sub.id} passHref>
                        <a className="mob_subcatagory" onClick={hideSideDrawer}><span className="mob-cat">{sub.name}</span></a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                );
              })}
            </Dropdown>
          );
        })}
      </div>
    </div>
  );
}
