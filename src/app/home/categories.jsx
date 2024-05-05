import Link from 'next/link';
import ScrollDownicon from '@@/assets/icons/scrollDown.svg';

export default function Categories() {
  return (
    <>
      <div className='w-full bg-white h-[50vh] sm:h-[90vh] overflow-hidden text-center flex flex-col items-center px-4 py-0 relative'>
        <ScrollDownicon
          className='text-primary w-8 h-8 animate-pulse mt-2 sm:mt-4'
          stroke='#A69080'
        />
        <div className='text-olive flex flex-col items-center my-auto mx-0 gap-y-6'>
          <div className='flex flex-col items-center gap-y-3'>
            <h1 className='font-extrabold text-2xl sm:text-4xl md:text-6xl text-center max-w-[120ch]'>
              Timeless Treasures Await
            </h1>
            <p className='font-light text-center text-base sm:text-xl md:text-2xl max-w-[120ch]'>
              Discover vintage elegance,
            </p>
            <p className='font-light text-center text-sm sm:text-base md:text-xl sm:max-w-[120ch]'>
              Cherish and reimagine in your modern style.
            </p>
          </div>
          <Link
            href='/apparel'
            className='text-center text-white bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-sm sm:text-base'
          >
            View apparel
          </Link>
        </div>
      </div>
      <div className='w-full bg-heroShoesBg bg-cover bg-fixed bg-center bg-no-repeat h-[55vh] sm:h-[95vh] overflow-hidden text-center flex justify-center items-center px-4 py-0'>
        <div className='flex flex-col items-center text-white gap-y-4 p-8 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-[.5em] border-[1px] border-solid border-white border-opacity-10 rounded-2xl shadow-black/50  overflow-hidden shadow-2xl hover:shadow-black/75 hover:backdrop-blur-[1em] transition'>
          <h1 className='font-extrabold text-2xl sm:text-4xl md:text-6xl text-center text-shadow-lg'>
            Sole searching? look no further
          </h1>
          <p className='font-light text-center text-base sm:text-xl md:text-2xl text-shadow-lg'>
            Find your sole mate here.
          </p>
          <Link
            href='/shoes'
            className='text-center bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-sm sm:text-base'
          >
            View shoes
          </Link>
        </div>
      </div>
      <div className='w-full bg-eggShell h-[50vh] sm:h-[90vh] overflow-hidden text-center flex flex-col items-center px-4 py-0 relative'>
        <ScrollDownicon
          className='text-primary w-8 h-8 animate-pulse mt-2 sm:mt-4'
          stroke='#A69080'
        />
        <div className='text-olive flex flex-col items-center my-auto mx-0 gap-y-6'>
          <div className='flex flex-col items-center gap-y-3'>
            <h1 className='font-extrabold text-2xl sm:text-4xl md:text-6xl text-center max-w-[120ch]'>
              Fashionably Eco-Conscious
            </h1>
            <p className='font-light text-center text-base sm:text-xl md:text-2xl max-w-[120ch]'>
              Elevate your style, reduce your footprint.
            </p>
            <p className='font-light text-center text-sm sm:text-base md:text-xl max-w-[120ch]'>
              Here sustainability meets style seamlessly.
            </p>
          </div>
          <Link
            href='/krafts'
            className='text-center text-white bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-sm sm:text-base'
          >
            View krafts
          </Link>
        </div>
      </div>
      <div className='w-full bg-heroBooksBg bg-cover bg-fixed bg-center bg-no-repeat h-[55vh] sm:h-[95vh] overflow-hidden text-center flex justify-center items-center px-4 py-0'>
        <div className='flex flex-col items-center text-white gap-y-4 p-8 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-[.5em] border-[1px] border-solid border-white border-opacity-10 rounded-2xl shadow-black/50  overflow-hidden shadow-2xl hover:shadow-black/75 hover:backdrop-blur-[1em] transition'>
          <h1 className='font-extrabold text-2xl sm:text-4xl md:text-6xl text-center text-shadow-lg'>
            Secondhand stories, firsthand magic
          </h1>
          <p className='font-light text-center text-base sm:text-xl md:text-2xl text-shadow-lg'>
            Time-tested tales in every bind
          </p>
          <Link
            href='/books'
            className='text-center bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-sm sm:text-base'
          >
            View books
          </Link>
        </div>
      </div>
    </>
  );
}
