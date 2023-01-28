import React from "react";

import Building from "../components/Building";

export default function building() {
  return (
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
  );
}
