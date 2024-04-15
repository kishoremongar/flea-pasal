'use client';

import { useSearchParams } from 'next/navigation';
import ChangePasswordForm from './components/changePasswordForm';
import ResetSuccess from './components/resetSuccess';

export default function ChangePasswordPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get('s') === '1';
  return <>{success ? <ResetSuccess /> : <ChangePasswordForm />}</>;
}
