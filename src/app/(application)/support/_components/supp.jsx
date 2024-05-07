export default function Supp() {
  return (
    <main className='container max-w-7xl mx-auto'>
      <section className='search flex items-center justify-center'>
        <h1 className='search-title text-center text-gray-300 font-normal text-3xl md:text-4xl'>
          How can we help?
        </h1>
        <form className='search-form relative mt-8'>
          <span className='search-icon absolute left-3 top-1/2 transform -translate-y-1/2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 478.208 478.208'
              className='w-6 h-6 fill-current text-gray-500'
            >
              <path d='M473.418 449.285L303.28 279.148c59.759-73.087 48.954-180.779-24.132-240.538S98.369-10.344 38.61 62.742-10.344 243.521 62.742 303.28c62.953 51.473 153.453 51.473 216.406 0l170.138 170.138c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.713zm-302.2-141.534c-75.37-.085-136.449-61.163-136.533-136.533 0-75.405 61.128-136.533 136.533-136.533s136.533 61.128 136.533 136.533-61.128 136.533-136.533 136.533z' />
            </svg>
          </span>
          \
          <input
            type='text'
            placeholder='Search help articles'
            className='search-input w-full py-3 pl-16 pr-8 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-500'
          />
        </form>
      </section>

      <main className='main flex flex-wrap justify-between mt-12'>
        <section className='menu w-full md:w-64 px-6 md:px-0'>
          <h1 className='menu-title font-bold text-lg text-gray-400'>
            Popular topics
          </h1>
          <nav className='menu-links mt-4'>
            <a
              href='#'
              className='menu-link block py-2 text-sm text-indigo-600 hover:text-white hover:bg-indigo-600'
            >
              Account
            </a>
            <a
              href='#'
              className='menu-link block py-2 text-sm text-indigo-600 hover:text-white hover:bg-indigo-600'
            >
              Billing
            </a>
            <a
              href='#'
              className='menu-link block py-2 text-sm text-indigo-600 hover:text-white hover:bg-indigo-600'
            >
              Privacy
            </a>
            <a
              href='#'
              className='menu-link block py-2 text-sm text-indigo-600 hover:text-white hover:bg-indigo-600'
            >
              Refunds
            </a>
            <a
              href='#'
              className='menu-link block py-2 text-sm text-indigo-600 hover:text-white hover:bg-indigo-600'
            >
              Verification
            </a>
            <a
              href='#'
              className='menu-link block py-2 text-sm text-indigo-600 hover:text-white hover:bg-indigo-600'
            >
              Integrations
            </a>
          </nav>

          <div className='support mt-8'>
            <h2 className='support-title text-lg font-bold text-gray-400'>
              Contact support
            </h2>
            <p className='support-text mt-2 text-sm text-gray-400'>
              24/7 help from our support staff
            </p>
            <a
              href='#'
              className='support-button block mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg text-sm text-center hover:bg-indigo-700'
            >
              Contact
            </a>
          </div>
        </section>

        <section className='content flex flex-wrap w-full md:w-3/5 px-6 md:px-0 mt-12 md:mt-0'>
          <div className='content-item w-full sm:w-1/2 md:w-full lg:w-1/2 px-4 mb-8'>
            <h3 className='content-title font-semibold text-lg text-gray-400 mb-2'>
              Waiting period for first payout{' '}
              <span className='badge badge-primary ml-2 px-2 py-1 rounded-lg text-xs text-indigo-600 bg-indigo-100'>
                Payment
              </span>
            </h3>
            <p className='content-description text-sm text-gray-400'>
              With so many different ways today to find information online, it
              can sometimes be hard to know where to go to first.
            </p>
          </div>

          <div className='content-item w-full sm:w-1/2 md:w-full lg:w-1/2 px-4 mb-8'>
            <h3 className='content-title font-semibold text-lg text-gray-400 mb-2'>
              E Banks That Accept Us Casino Players{' '}
              <span className='badge badge-secondary ml-2 px-2 py-1 rounded-lg text-xs text-indigo-600 bg-indigo-100'>
                Privacy
              </span>
            </h3>
            <p className='content-description text-sm text-gray-400'>
              With so many different ways today to find information online, it
              can sometimes be hard to know where to go to first.
            </p>
          </div>

          <div className='content-item w-full sm:w-1/2 md:w-full lg:w-1/2 px-4 mb-8'>
            <h3 className='content-title font-semibold text-lg text-gray-400 mb-2'>
              How To Protect Your Computer Very Useful Tips{' '}
              <span className='badge badge-primary ml-2 px-2 py-1 rounded-lg text-xs text-indigo-600 bg-indigo-100'>
                API
              </span>
            </h3>
            <p className='content-description text-sm text-gray-400'>
              With so many different ways today to find information online, it
              can sometimes be hard to know where to go to first.
            </p>
          </div>
        </section>
      </main>
    </main>
  );
}
