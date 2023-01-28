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
      />
    </>
  );
};

export default MyPage;
