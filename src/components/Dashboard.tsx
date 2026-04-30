import Calendar from "./Calendar";
import Hero from "./HeroSection/Hero";
import Navigation from "./navigation/Navigation";

export default function Dashboard() {
  return (
    <>
      <Navigation />
      <Hero />
      <Calendar />
    </>
  );
}
