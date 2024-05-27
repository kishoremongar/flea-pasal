import { useRouter } from 'next/navigation';
import SuccessHero from '@@/assets/icons/passwordSuccess.svg';
import PrimaryButton from '@/components/common/primaryButton';

export default function ResetSuccess() {
  const router = useRouter();
  return (
    <>
      <h2 className='text-olive text-[1.625rem] font-bold text-center'>
        Password changed successfully!
      </h2>
      <section className='flex flex-col gap-y-10 bg-passwordBg items-center mb-3'>
        <SuccessHero />
      </section>
      <div className='flex flex-col gap-y-3 items-center'>
        <PrimaryButton
          rootClassName='!h-14 !font-normal'
          titleClassName='!text-xl'
          onClick={() => router.push('/auth/login')}
          size='lg'
        >
          Sign in
        </PrimaryButton>
      </div>
    </>
  );
}
