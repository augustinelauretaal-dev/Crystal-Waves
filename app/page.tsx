import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Amenities from "@/components/Amenities";
import Rooms from "@/components/Rooms";
import BookingForm from "@/components/BookingForm";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingMessenger from "@/components/FloatingMessenger";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Amenities />
      <Rooms />
      <BookingForm />
      <Gallery />
      <Reviews />
      <Location />
      <Contact />
      <Footer />
      <FloatingMessenger />
    </main>
  );
}
