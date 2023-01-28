import React, { useState } from "react";
import { type NextPage } from "next";
import Searchbar from "../components/Searchbar";

// export default function building() {
const About: NextPage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Searchbar search={search} setSearch={setSearch} />
      <div
        style={{
          color: "white",
          margin: "2rem",
        }}
      >
        This application is a dorm review and information site for Brown
        University designed to help students find the best dorm. Students are
        able to search for dorms, read reviews, and leave their own reviews. A
        review consists of evaluating the dorm on a scale of 1-5 for amenities,
        location, and comfort. Students can also leave comments where they can
        provide more detailed information about the dorm.
        <br />
        <br />
        We then use GPT3 to dynamically generate a summary of the dorm based on
        the reviews. This summary is displayed on the dorm page and provides a
        quick overview of the overall dorm experience. The reason we use GPT3 is
        because it is capable of generating coherent and informative summaries
        from a large amount of text without manual intervention every time a new
        review is submitted.
        <br />
        <br />
        Designed by Andrew Li, Nick Bottone, Nick Vadasz, and Oren Kohavi, this
        application is our submission for Hack@Brown 2023.
      </div>
    </>
  );
};

export default About;
