import FAQSection from "@/components/aboutUs/faq/page";
import GlobalBands from "@/components/aboutUs/globalBrands/page";
import CarFleet from "@/components/aboutUs/ourFleetsRentals/page";
import YourBusiness from "@/components/aboutUs/yourBusiness/page";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";

const AboutUs = () => {
  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-16 pt-8 m-auto  relative z-9">
          <div className="max-w-6xl m-auto">
            <h1 className="mb-4 text-5xl py-20 font-bold text-white text-center">
              About us
            </h1>
          </div>
        </div>
      </div>

      <section className=" bg-white">
        <YourBusiness />
      </section>

      <section>
        <GlobalBands />
      </section>

      <section>
        <CarFleet />
      </section>

      <section className="bg-white">
        <FAQSection />
      </section>
    </>
  );
};

export default AboutUs;
