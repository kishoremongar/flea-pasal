'use client';

import { useSearchParams } from 'next/navigation';
import ChangePasswordForm from './_components/changePasswordForm';
import ResetSuccess from './_components/resetSuccess';

export default function ChangePasswordPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get('s') === '1';
  return <>{success ? <ResetSuccess /> : <ChangePasswordForm />}</>;
}
