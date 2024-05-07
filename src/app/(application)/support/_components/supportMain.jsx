export default function SupportMain() {
  return (
    <main className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <section className='flex items-center justify-center flex-col'>
        <h1 className='search-title text-center text-gray-300 font-normal text-3xl md:text-4xl'>
          How can we help?
        </h1>
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
