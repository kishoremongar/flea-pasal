import { useRouter } from 'next/navigation';
import PrimaryButton from '../../../../components/common/primaryButton';
import SuccessHero from '../../../../../public/assets/icons/passwordSuccess.svg';

export default function ResetSuccess() {
  const router = useRouter();
  return (
    <>
      <h2 className='text-primary-black text-[1.625rem]  font-bold text-center'>
        Password changed successfully!
      </h2>
      <section className='flex flex-col gap-y-10 bg-passwordBg items-center mb-3'>
        <SuccessHero />
      </section>
      <div className='flex flex-col gap-y-3 items-center'>
        <PrimaryButton
          variant='gradient'
          rootClassName='!h-14'
          titleClassName='!text-[22px]'
          onClick={() => router.push('/auth/login')}
          size='lg'
        >
          Sign in
        </PrimaryButton>
      </div>
    </>
  );
}
