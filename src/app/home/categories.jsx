import Link from 'next/link';
import ScrollDownicon from '@@/assets/icons/scrollDown.svg';

export default function Categories() {
  return (
    <div>
      <div className='section relative'>
        <ScrollDownicon className='text-primary w-8 h-8' stroke='#A69080' />
        <div className='text-olive'>
          <h1 className='font-extrabold text-6xl text-center'>
            Timeless Treasures Await
          </h1>
          <p className='font-light text-center text-2xl'>
            Discover Vintage Elegance,
          </p>
          <p className='font-light text-center text-xl'>
            waiting to be cherished and reimagined in your modern style.
          </p>
        </div>
      </div>

      <div className='section'>
        <div className='flex flex-col items-center text-white p-6 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-[.5em] border-[1px] border-solid border-white border-opacity-10 rounded-2xl shadow-black/50  overflow-hidden shadow-2xl hover:shadow-black/75 hover:backdrop-blur-[1em] transition'>
          <h1 className='font-extrabold text-6xl text-center text-shadow-lg'>
            Sole Searching? Look No Further
          </h1>
          <p className='font-light text-center text-2xl text-shadow-lg'>
            Find Your Sole Mate Here.
          </p>
          <Link
            href='#'
            className='text-center bg-primary hover:bg-primary/75 w-fit mt-8 py-2 px-8 rounded-md text-base'
          >
            Shoes
          </Link>
        </div>
      </div>
      <div className='section relative'>
        <ScrollDownicon className='text-primary w-8 h-8' stroke='#A69080' />
        <div className='text-olive'>
          <h1 className='font-extrabold text-6xl text-center'>
            Fashionably Eco-Conscious
          </h1>
          <p className='font-light text-center text-2xl'>
            Elevate Your Style, Reduce Your Footprint.
          </p>
          <p className='font-light text-center text-xl'>
            Here sustainability meets style seamlessly.
          </p>
        </div>
      </div>
      <div className='section'>
        <div className='flex flex-col items-center text-white p-6 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-[.5em] border-[1px] border-solid border-white border-opacity-10 rounded-2xl shadow-black/50  overflow-hidden shadow-2xl hover:shadow-black/75 hover:backdrop-blur-[1em] transition'>
          <h1 className='font-extrabold text-6xl text-center text-shadow-lg'>
            Secondhand Stories, Firsthand Magic
          </h1>
          <p className='font-light text-center text-2xl text-shadow-lg'>
            Time-Tested Tales in Every Bind
          </p>
          <Link
            href='#'
            className='text-center bg-primary hover:bg-primary/75 w-fit mt-8 py-2 px-8 rounded-md text-base'
          >
            Books
          </Link>
        </div>
      </div>
    </div>
  );
}
