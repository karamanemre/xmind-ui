import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const publicPaths = ['/auth'];
const userPaths = ['/demand'];
const adminPaths = ['/demand-answer'];

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userRole = user?.roles?.[0];

  useEffect(() => {
    const pathname = window.location.pathname;

    // Eğer kullanıcı giriş yapmamışsa ve public olmayan bir sayfaya erişmeye çalışıyorsa
    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      router.push('/auth');
      return;
    }

    // Eğer kullanıcı giriş yapmışsa ve auth sayfasına gitmeye çalışıyorsa
    if (isAuthenticated && pathname === '/auth') {
      if (userRole === 'ADMIN') {
        router.push('/demand-answer');
      } else {
        router.push('/demand');
      }
      return;
    }

    // Eğer kullanıcı USER rolünde ve admin sayfalarına erişmeye çalışıyorsa
    if (userRole === 'USER' && adminPaths.includes(pathname)) {
      router.push('/demand');
      return;
    }

    // Eğer kullanıcı ADMIN rolünde ve user sayfalarına erişmeye çalışıyorsa
    if (userRole === 'ADMIN' && userPaths.includes(pathname)) {
      router.push('/demand-answer');
      return;
    }

    // Ana sayfaya gidilirse role göre yönlendirme
    if (pathname === '/') {
      if (!isAuthenticated) {
        router.push('/auth');
      } else if (userRole === 'ADMIN') {
        router.push('/demand-answer');
      } else {
        router.push('/demand');
      }
      return;
    }
  }, [isAuthenticated, userRole, router]);

  return children;
};

export default AuthGuard; 