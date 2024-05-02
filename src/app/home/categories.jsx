import Link from 'next/link';
import ScrollDownicon from '@@/assets/icons/scrollDown.svg';

export default function Categories() {
  return (
    <>
      <div className='w-full bg-white h-[90vh] overflow-hidden text-center flex flex-col items-center px-4 py-0 relative'>
        <ScrollDownicon
          className='text-primary w-8 h-8 animate-pulse mt-4'
          stroke='#A69080'
        />
        <div className='text-olive flex flex-col items-center my-auto mx-0 gap-y-6'>
          <div className='flex flex-col items-center gap-y-3'>
            <h1 className='font-extrabold text-6xl text-center max-w-[120ch]'>
              Timeless Treasures Await
            </h1>
            <p className='font-light text-center text-2xl max-w-[120ch]'>
              Discover Vintage Elegance,
            </p>
            <p className='font-light text-center text-xl max-w-[120ch]'>
              waiting to be cherished and reimagined in your modern style.
            </p>
          </div>
          <Link
            href='/pasal/apparel'
            className='text-center text-white bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-base'
          >
            View apparel
          </Link>
        </div>
      </div>
      <div className='w-full bg-heroShoesBg bg-cover bg-fixed bg-center bg-no-repeat h-[95vh] overflow-hidden text-center flex justify-center items-center px-4 py-0'>
        <div className='flex flex-col items-center text-white gap-y-4 p-8 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-[.5em] border-[1px] border-solid border-white border-opacity-10 rounded-2xl shadow-black/50  overflow-hidden shadow-2xl hover:shadow-black/75 hover:backdrop-blur-[1em] transition'>
          <h1 className='font-extrabold text-6xl text-center text-shadow-lg'>
            Sole Searching? Look No Further
          </h1>
          <p className='font-light text-center text-2xl text-shadow-lg'>
            Find Your Sole Mate Here.
          </p>
          <Link
            href='/pasal/shoes'
            className='text-center bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-base'
          >
            View shoes
          </Link>
        </div>
      </div>
      <div className='w-full bg-eggShell h-[90vh] overflow-hidden text-center flex flex-col items-center px-4 py-0 relative'>
        <ScrollDownicon
          className='text-primary w-8 h-8 animate-pulse mt-4'
          stroke='#A69080'
        />
        <div className='text-olive flex flex-col items-center my-auto mx-0 gap-y-6'>
          <div className='flex flex-col items-center gap-y-3'>
            <h1 className='font-extrabold text-6xl text-center max-w-[120ch]'>
              Fashionably Eco-Conscious
            </h1>
            <p className='font-light text-center text-2xl max-w-[120ch]'>
              Elevate Your Style, Reduce Your Footprint.
            </p>
            <p className='font-light text-center text-xl max-w-[120ch]'>
              Here sustainability meets style seamlessly.
            </p>
          </div>
          <Link
            href='/pasal/krafts'
            className='text-center text-white bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-base'
          >
            View krafts
          </Link>
        </div>
      </div>
      <div className='w-full bg-heroBooksBg bg-cover bg-fixed bg-center bg-no-repeat h-[95vh] overflow-hidden text-center flex justify-center items-center px-4 py-0'>
        <div className='flex flex-col items-center text-white gap-y-4 p-8 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-[.5em] border-[1px] border-solid border-white border-opacity-10 rounded-2xl shadow-black/50  overflow-hidden shadow-2xl hover:shadow-black/75 hover:backdrop-blur-[1em] transition'>
          <h1 className='font-extrabold text-6xl text-center text-shadow-lg'>
            Secondhand Stories, Firsthand Magic
          </h1>
          <p className='font-light text-center text-2xl text-shadow-lg'>
            Time-Tested Tales in Every Bind
          </p>
          <Link
            href='/pasal/books'
            className='text-center bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-base'
          >
            View books
          </Link>
        </div>
      </div>
    </>
  );
}
