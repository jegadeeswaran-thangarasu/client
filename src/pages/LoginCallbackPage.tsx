import { LoginCallback } from '@okta/okta-react';
import Spinner from '@/components/ui/Spinner';
import ErrorAlert from '@/components/ui/ErrorAlert';

export default function LoginCallbackPage() {
  return (
    <LoginCallback
      loadingElement={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
      errorComponent={({ error }: { error: Error }) => (
        <div className="flex min-h-screen items-center justify-center">
          <ErrorAlert message={error.message} />
        </div>
      )}
    />
  );
}
