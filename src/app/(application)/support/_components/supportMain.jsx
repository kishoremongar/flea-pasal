import Link from 'next/link';
import PrimaryButton from '@/components/common/primaryButton';

export default function SupportMain() {
  return (
    <main className='mx-auto p-4 sm:p-6 lg:p-8 bg-white'>
      <section className='flex items-center justify-center flex-col'>
        <h1 className='search-title text-center text-olive font-normal text-3xl md:text-4xl'>
          How can we help?
        </h1>
      </section>

      <main className='grid grid-cols-12 gap-x-4 mt-12 w-full'>
        <section className='col-span-12 md:col-span-3 flex flex-col gap-y-6 px-6 py-4 shadow-card rounded-md'>
          <h1 className='font-bold text-lg text-olive'>Popular topics</h1>
          <nav className='flex flex-col gap-y-4 text-sm text-olive'>
            <Link href='#' className='hover:text-secondary'>
              Account
            </Link>
            <Link href='#' className='hover:text-secondary'>
              Billing
            </Link>
            <Link href='#' className='hover:text-secondary'>
              Privacy
            </Link>
            <Link href='#' className='hover:text-secondary'>
              Refunds
            </Link>
            <Link href='#' className='hover:text-secondary'>
              Verification
            </Link>
            <Link href='#' className='hover:text-secondary'>
              Integrations
            </Link>
          </nav>
          <div className='flex flex-col gap-y-2 justify-self-end'>
            <h2 className='text-lg font-bold text-olive'>Contact support</h2>
            <p className='text-sm text-secondary'>
              24/7 help from our support staff
            </p>
            <PrimaryButton rootClassName='!w-full'>Contact</PrimaryButton>
          </div>
        </section>

        <section className='col-span-12 md:col-span-9 flex flex-wrap w-full px-6 mt-12 md:mt-0 shadow-card rounded-md py-4'>
          <div className='w-full sm:w-1/2 md:w-full lg:w-1/2 px-4 mb-8'>
            <h3 className='font-semibold text-lg text-olive mb-2'>
              Waiting period for refund{' '}
              <span className='badge badge-primary ml-2 px-2 py-1 rounded-lg text-xs text-white font-normal bg-secondary'>
                Payment
              </span>
            </h3>
            <p className='text-sm text-secondary'>
              The waiting period for a refund typically spans a minimum of five
              business days. During this time, the company processes the refund
              request and verifies transaction details. Factors such as payment
              processor timelines and banking procedures can influence the
              exactstatements duration. It&apos;s advisable to monitor your
              account post-request to ensure the refund reflects accurately.
              Contacting customer support after the minimum waiting period can
              help address any concerns or delays in the refund process.
            </p>
          </div>

          <div className='w-full sm:w-1/2 md:w-full lg:w-1/2 px-4 mb-8'>
            <h3 className='font-semibold text-lg text-olive mb-2'>
              How to protect your cards online{' '}
              <span className='badge badge-secondary ml-2 px-2 py-1 rounded-lg text-xs text-white font-normal bg-secondary'>
                Privacy
              </span>
            </h3>
            <p className='text-sm text-secondary'>
              To protect your cards online, use strong, unique passwords for
              each account and enable two-factor authentication where possible.
              Be cautious of phishing scams and only enter your card details on
              secure, trusted websites. Regularly monitor your bank statements
              for any unauthorized transactions and report them immediately.
            </p>
          </div>

          <div className='w-full sm:w-1/2 md:w-full lg:w-1/2 px-4 mb-8'>
            <h3 className='font-semibold text-lg text-olive mb-2'>
              How To Protect Your Computer Very Useful Tips{' '}
              <span className='badge badge-primary ml-2 px-2 py-1 rounded-lg text-xs text-white font-normal bg-secondary'>
                API
              </span>
            </h3>
            <p className='text-sm text-secondary'>
              Update your system regularly to fix vulnerabilities. Use strong
              passwords and enable a firewall. Install reputable antivirus
              software for ongoing protection. Be cautious of suspicious emails
              and downloads. Backup important data regularly to safeguard
              against loss.
            </p>
          </div>
        </section>
      </main>
    </main>
  );
}
