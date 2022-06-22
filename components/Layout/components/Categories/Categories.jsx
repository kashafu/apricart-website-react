import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

import Slider from "react-slick";
import Link from "next/link";
import { Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
let base_url_api = "https://staging.apricart.pk/v1";

export default function Categories() {
  const city = "karachi"; //city from popup
  //Peshawar
  const [users, setUsers] = useState([]);
  const cookies = new Cookies();

  const getPopularitems =  async () => {
    const response = await axios.get(
      base_url_api + `/catalog/categories?level=all`
    );
    
    setUsers(response.data.data);
  };
  useEffect(() => {
    getPopularitems();
  }, []);

  return (
    <div className="sidebar-navigation">
      <strong className="title">Category</strong>

      <div className="sidebar">
        {users.map((catagory) => {
          return (
            <Dropdown key={catagory.id} className="dropdown1">
              <Dropdown.Toggle id="dropdown-basic">
                <i className="fas fa-plus"></i>

                <Link href="/catagory/[idd]" as={"/catagory/" + catagory.id} passHref>
                  <span className="forpadding"> {catagory.name}</span>
                </Link>
              </Dropdown.Toggle>
              {catagory.childrenData.map((sub) => {
                return (
                  <Dropdown.Menu key={sub.id}>
                    <Dropdown.Item>
                      <Link href="/catagory/[idd]" as={"/catagory/" + sub.id }>
                        <a className="subcatagory">{sub.name}</a>
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
