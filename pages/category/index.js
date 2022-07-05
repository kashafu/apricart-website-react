import React from "react";
import Link from "next/link";
import axios from "axios";

export default function Posts({ posts }) {
  console.log("Data product",posts)
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <h3>
              <Link href="/category/[id]" as={"/category/" + post.id}>
                <a>{post.name}</a>
              </Link>
            </h3>
            
          </li>
        );
      })}
    </ul>
  );
}

export async function getServerSideProps() {
  const res =  await fetch("https://staging.apricart.pk/v1/catalog/categories?level=all");
 
  const getdata = await res.json();
  const posts = getdata.data
  // const  posts = await postData.data.childrenData;
  
  

  return {
    props: {
      posts,
    },
  };
}
