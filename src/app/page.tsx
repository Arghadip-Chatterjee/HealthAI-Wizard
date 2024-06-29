import Image from "next/image";
import { AuroraHero } from "./hero";
import { FloatingNavDemo } from "./navbar";
import Feature from "./feature";
import { StickyScrollRevealDemo } from "./sticky-scroll";
import Link
 from "next/link";
export default function Home() {
  return (
    <div>
      <FloatingNavDemo />
      <div>
        <Link href="http://127.0.0.1:8080/" target="_blank">
          Medical Chatbot
        </Link>
      </div>
      <AuroraHero />
      <StickyScrollRevealDemo />
      <Feature />
    </div>
  );
}
