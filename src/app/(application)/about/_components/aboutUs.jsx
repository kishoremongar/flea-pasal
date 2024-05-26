import GreenTree from '@@/assets/icons/greenTree.svg';
import Diversity from '@@/assets/icons/diversity.svg';
import AboutHero from '@@/assets/icons/aboutUs.svg';

export default function AboutUsMain() {
  return (
    <div className='flex flex-col gap-y-40 w-full items-center justify-center bg-white rounded-md pt-7 pb-7 md:pt-20 md:pb-24'>
      <section class='w-full'>
        <div class='container items-center max-w-6xl px-8 mx-auto xl:px-5'>
          <div class='flex flex-wrap items-center gap-y-6 sm:-mx-3'>
            <div class='w-full md:w-1/2 md:px-3'>
              <div class='w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0'>
                <h1 class='text-4xl font-extrabold tracking-tight text-olive sm:text-5xl md:text-4xl lg:text-5xl'>
                  <span class='block xl:inline'>Flea Pasal </span>
                  <span class='block text-secondary xl:inline'>
                    Our Mission & Values
                  </span>
                </h1>
                <p class='mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl'>
                  At FleaPasal, we&apos;re dedicated to sustainability and
                  community. Our mission is to promote eco-friendly shopping
                  while uniting individuals. Thrift and reuse are at the core of
                  our efforts to reduce waste and support a greener lifestyle.
                  Our values include environmental responsibility, inclusivity,
                  and ethical practices.
                </p>
              </div>
            </div>
            <div class='w-full flex justify-center md:w-1/2'>
              <AboutHero className='w-full md:w-2/3 h-full md:h-2/3' />
            </div>
          </div>
        </div>
      </section>
      <section class='w-full flex flex-col gap-y-40'>
        <div class='box-border gap-y-6 flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16'>
          <div class='box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10'>
            <GreenTree className='w-full md:w-2/3 h-full md:h-2/3' />
          </div>
          <div class='box-border order-first w-full text-olive border-solid md:w-1/2 md:pl-10 md:order-none'>
            <h2 class='m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl'>
              Community Sustainability
            </h2>
            <p class='pt-4 pb-8 m-0 leading-7 text-secondary border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg'>
              Build an atmosphere that creates and fosters community unity
              through sustainable practices.
            </p>
            <ul class='p-0 m-0 leading-6 border-0 border-gray-300'>
              <li class='box-border relative py-1 pl-0 text-left text-tertiary border-solid'>
                <span class='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full'>
                  <span class='text-sm font-bold'>✓</span>
                </span>{' '}
                Creating a platform for eco-conscious shopping and support.
              </li>
              <li class='box-border relative py-1 pl-0 text-left text-tertiary border-solid'>
                <span class='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full'>
                  <span class='text-sm font-bold'>✓</span>
                </span>{' '}
                Environmental responsibility through thrift and reuse.
              </li>
              <li class='box-border relative py-1 pl-0 text-left text-tertiary border-solid'>
                <span class='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full'>
                  <span class='text-sm font-bold'>✓</span>
                </span>{' '}
                Mindful consumption and reducing waste together.
              </li>
            </ul>
          </div>
        </div>
        <div class='box-border gap-y-6 flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16'>
          <div class='box-border w-full text-olive border-solid md:w-1/2 md:pl-6 xl:pl-32'>
            <h2 class='m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl'>
              Celebrating Diversity & Inclusion
            </h2>
            <p class='pt-4 pb-8 m-0 leading-7 text-secondary border-0 border-gray-300 sm:pr-10 lg:text-lg'>
              Embracing diversity in our community and celebrating individuals
              from all backgrounds.
            </p>
            <ul class='p-0 m-0 leading-6 border-0 border-gray-300'>
              <li class='box-border relative py-1 pl-0 text-left text-tertiary border-solid'>
                <span class='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full'>
                  <span class='text-sm font-bold'>✓</span>
                </span>{' '}
                Partnering with diverse suppliers and artisans
              </li>
              <li class='box-border relative py-1 pl-0 text-left text-tertiary border-solid'>
                <span class='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full'>
                  <span class='text-sm font-bold'>✓</span>
                </span>{' '}
                Supporting initiatives that empower underrepresented groups.
              </li>
              <li class='box-border relative py-1 pl-0 text-left text-tertiary border-solid'>
                <span class='inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-primary rounded-full'>
                  <span class='text-sm font-bold'>✓</span>
                </span>{' '}
                Creating a welcoming environment where everyone feels valued.
              </li>
            </ul>
          </div>

          <div class='box-border flex justify-center relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2'>
            <Diversity className='w-full md:w-2/3 h-full md:h-2/3' />
          </div>
        </div>
      </section>
    </div>
  );
}
