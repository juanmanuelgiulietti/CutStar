import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PathSwitcher from "@/components/PathSwitcher";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      {/* Scroll 3 + 4: cards swap to the selected path's form on click */}
      <PathSwitcher />
    </main>
  );
}
