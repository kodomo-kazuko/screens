// App.tsx
import { ParallaxText } from "./components/slide";

// Add font import in your global CSS or here via styled-components
import './fonts.css'; // Create this file if needed

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
        Starting Soon
      </ParallaxText>
      <ParallaxText
        baseVelocity={100}
        className="text-6xl text-white"
        style={{ top: "60%" }}
      >
        Starting Soon
      </ParallaxText>
    </section>
  );
}
