import { Toaster } from 'sonner';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme/index';

export const JournalApp = () => {
  return (
    <AppTheme >
      <Toaster position='top-center'  richColors={true} />
        <AppRouter />
    </AppTheme>
  )
}
