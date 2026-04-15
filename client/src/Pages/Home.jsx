import React from "react";

import Hero from "../Components/HomeComponents/Hero"
import Features  from "../Components/HomeComponents/Features";
import EventList  from "../Components/HomeComponents/EventList";

const Home = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <EventList/>

    </div>
  );
};

export default Home;