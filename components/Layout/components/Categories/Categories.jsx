import Link from "next/link";
import { Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Categories({categories}) {
    return (
        <div className="sidebar-navigation">
            <strong className="title">Category</strong>
            <div className="sidebar">
                {categories.map((category) => {
                    return (
                        <Dropdown key={category.id} className="dropdown1">
                            <Dropdown.Toggle id="dropdown-basic">
                                <i className="fas fa-plus"></i>

                                <Link
                                    href="/category/[id]"
                                    as={"/category/" + category.id}
                                    passHref
                                >
                                    <span className="forpadding">
                                        {" "}
                                        {category.name}
                                    </span>
                                </Link>
                            </Dropdown.Toggle>
                            {category.childrenData.map((sub) => {
                                return (
                                    <Dropdown.Menu key={sub.id}>
                                        <Dropdown.Item>
                                            <Link
                                                href="/category/[id]"
                                                as={"/category/" + sub.id}
                                            >
                                                <a className="subcatagory">
                                                    {sub.name}
                                                </a>
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
