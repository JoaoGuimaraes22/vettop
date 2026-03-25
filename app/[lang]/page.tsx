import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import ScrollProgress from "./_components/scroll-progress";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import StatsCounters from "./_components/stats-counters";
import About from "./_components/about";
import Services from "./_components/services";
import Team from "./_components/team";
import GalleryStrip from "./_components/gallery-strip";
import Reviews from "./_components/reviews";
import GoogleReviews from "./_components/google-reviews";
import HoursEmergency from "./_components/hours-emergency";
import Pricing from "./_components/pricing";
import FAQ from "./_components/faq";
import Contact from "./_components/contact";
import Appointment from "./_components/appointment";
import Footer from "./_components/footer";
import AppointmentBar from "./_components/appointment-bar";

export default async function VetPage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <ScrollProgress />
      <Navbar lang={lang} dict={dict.navbar} />
      <main>
        <Hero dict={dict.hero} />
        <StatsCounters dict={dict.statsCounters} />
        <About dict={dict.about} />
        <Services dict={dict.services} />
        <Team dict={dict.team} />
        <GalleryStrip dict={dict.galleryStrip} />
        <Reviews dict={dict.reviews} />
        <GoogleReviews dict={dict.googleReviews} />
        <HoursEmergency dict={dict.hoursEmergency} />
        <Pricing dict={dict.pricing} />
        <FAQ dict={dict.faq} />
        <Contact dict={dict.contact} />
        <Appointment dict={dict.appointment} />
      </main>
      <Footer dict={dict.footer} />
      <AppointmentBar dict={dict.appointmentBar} />
    </>
  );
}
