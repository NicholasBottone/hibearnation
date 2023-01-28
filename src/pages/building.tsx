import React, { useState } from "react";
import { type NextPage } from "next";

import Building from "../components/Building";
import Searchbar from "../components/Searchbar";

// export default function building() {
const MyPage: NextPage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Searchbar search={search} setSearch={setSearch} />
      <Building
        name="Grad Center A"
        summary="Andrew lived here sophomore year"
        info={{
          laundryFloor: "3",
          laundryRoom: "310",
          capacity: "228",
          classYear: ["Sophomore", "Junior"],
        }}
        location="1 Vartan Gregorian Quad"
        images={[
          "https://reslife.brown.edu/sites/default/files/styles/classic_xsml/public/2020-04/GradCtrB_2.jpg?h=7e0400c3&itok=0Tgxt1fl",
          "https://upload.wikimedia.org/wikipedia/commons/8/85/BrownUniversity-GraduateCenter.jpg",
          "https://live.staticflickr.com/2590/3695901200_2c207712ef_b.jpg",
          "https://media.gettyimages.com/id/1420361871/photo/brown-university-grad-center-building.jpg?s=612x612&w=gi&k=20&c=tx5tVly5Ivpkxc5v8SwL1kk8XHzUbxMSECVD307fk9Y=",
          "https://fastly.4sqi.net/img/general/200x200/96202174_EvZ4ECtBXyzkIBtUcRT6C3IPVUyAyHO_1UP-0eDevrE.jpg",
        ]}
      />
    </>
  );
};

export default MyPage;
