import BannerCarousel from "@/components/BannerCarousel";
import HowItWorks from "@/components/HowItWorks";
import Newsletter from "@/components/Newsletter";
import Tutors from "@/components/Tutors";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div>
     <BannerCarousel />
     <Tutors/>
     <WhyChooseUs />
     <HowItWorks />
     <Newsletter />
     <Footer/>
    </div>
  );
}