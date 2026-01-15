import { KakaoLoginButton } from '@/components/KakaoLoginButton';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-[400]">
      <div className="max-w-[480] ">
        <KakaoLoginButton />
      </div>
    </div>
  );
}
