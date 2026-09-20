import { ParallaxText } from '../components/slide';
import './../fonts.css'; // Create this file if needed

export default function App() {
  return (
    <section
      className="relative w-screen h-screen overflow-hidden bg-lime-400"
      style={{ fontFamily: "Plaster, sans-serif" }}
    >
      <ParallaxText
        baseVelocity={-100}
        className="text-6xl text-white"
        style={{ top: "40%" }}
      >
        Break Time!
      </ParallaxText>
      <ParallaxText
        baseVelocity={100}
        className="text-6xl text-white"
        style={{ top: "50%" }}
      >
        休憩タイム!
      </ParallaxText>
    </section>
  );
}
