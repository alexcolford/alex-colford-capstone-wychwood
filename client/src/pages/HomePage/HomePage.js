import storyImage from "../../assets/images/photo-3.jpg";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Story from "../../components/Story/Story";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <main className="main">
      <section className="hero">
        <Hero />
      </section>
      <section className="about">
        <About />
      </section>
      <section className="story">
        <Story />
      </section>
    </main>
  );
};

export default HomePage;
