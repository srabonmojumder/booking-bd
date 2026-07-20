import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="md:pb-12 pb-5 md:pt-12 pt-0 bg-white">
      <div className="container mx-auto px-6 md:px-12 pt-12 pb-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-0 items-center">
          {/* Image Section */}

          <div className="flex flex-col items-center justify-center ">
            <div className="relative  ">
              {/* Top images */}
              <div className="md:grid grid-cols-2 gap-4">
                {/* Left Image */}
                <div className="relative md:block hidden">
                  <Image
                    src="/images/whoochoose_3.png"
                    alt="Professional Driver"
                    width={300}
                    height={400}
                    className="md:h-[500px] md:w-[300px]  object-cover"
                  />
                </div>

                {/* Right Image */}
                <div className="md:absolute right-1 -top-10">
                  <Image
                    src="/images/whoochoose_2.png"
                    alt="Professional Driver"
                    width={300}
                    height={400}
                    className=" md:h-[370px] h-full md:w-[298px] w-full object-cover"
                  />
                </div>
                <Image
                  src="/images/Vector-angel-1.png"
                  alt="Professional Driver"
                  width={100}
                  height={100}
                  className=" md:h-[100px] h-[50px] md:w-[100px] w-[50px] object-cover absolute z-[9] md:right-[46%] md:-top-14 -top-6"
                />
              </div>

              {/* Bottom image */}
              <div className="relative ">
                <div className=" md:block hidden absolute -bottom-8 right-12 flex items-center justify-end">
                  <Image
                    src="/images/whoochoose_1.png"
                    alt="Professional Driver"
                    width={300}
                    height={400}
                    className=" w-[250px]"
                  />
                </div>
                <Image
                  src="/images/Vector-angel-2.png"
                  alt="Professional Driver"
                  width={100}
                  height={100}
                  className=" md:h-[100px] h-[50px] md:w-[100px] w-[50px] object-cover absolute z-[9] md:right-0 md:-top-20 right-0 -bottom-5"
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="md:text-6xl text-lg md:leading-[65px] leading-4 md:mt-0 mt-10 font-bold text-gray-900">
              Here is why we are the right choice for you
            </h2>
            <p className="text-dark !md:mt-4 md:pt-3 !mt-1 md:text-lg text-sm">
              Our commitment to ethical practices has been a driving force.
              Clients rely on us for clear communication, honest collaboration,
              and reliable results. This foundation of trust has been key to our
              journey, fostering relationships and fueling our enduring success.
            </p>
            <p className="text-dark !md:mt-4 md:pt-2 !mt-1 md:text-lg text-sm">
              Trust our seasoned professionals to deliver measurable targeted
              messaging and data-driven optimizations. Lets make your goals a
              reality.
            </p>
            <div className="flex space-x-12">
              <div>
                <h3 className="md:text-5xl md:leading-[48px] text-[23px] leading-[20px] font-bold text-dark">10K+</h3>
                <p className="text-dark">Completed drives</p>
              </div>
              <div>
                <h3 className="md:text-5xl md:leading-[48px] text-[23px] leading-[20px] font-bold text-dark">87%</h3>
                <p className="text-dark">Client satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
