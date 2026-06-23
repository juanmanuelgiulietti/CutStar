import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ChooseYourPath from "@/components/ChooseYourPath";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <ChooseYourPath />
      {/* Scroll 4 — Forms (Entrega 4): wires ChooseYourPath onSelect to swap in the path form */}
    </main>
  );
}
