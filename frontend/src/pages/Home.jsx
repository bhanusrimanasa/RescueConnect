import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import LatestReports from "../components/LatestReports.jsx";
import SuccessStories from "../components/SuccessStories.jsx";
function Home() {
  return (
    <>
      <Hero />
      <Stats />
       <LatestReports />
        <SuccessStories />
    </>
  );
}

export default Home;