import Appbar from "@/components/common/Appbar";
import HeroSection from "@/components/pages/Homepage/HeroSection";
import PricingPage from "@/components/pages/Homepage/PricingCard";
import { NEXT_AUTH_CONFIG } from "@/lib/nextAuthConfig";
import { getServerSession } from "next-auth";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div className="w-full">
      <HeroSection />
      {/* <PricingPage /> */}
    </div>
  );
}
