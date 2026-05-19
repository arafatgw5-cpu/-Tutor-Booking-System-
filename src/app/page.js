import BannerCarousel from "@/components/BannerCarousel";
import HowItWorks from "@/components/HowItWorks";
import Tutors from "@/components/Tutors";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
     <BannerCarousel />
     <Tutors/>
     <WhyChooseUs />
     <HowItWorks />
    </div>
  );
}