import { Button } from '@mui/material';
import { HelloWorld } from '@apps/components';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation('common');
  // ======================= VIEWS
  return (
    <div>
      <Button variant="contained" onClick={async () => await setLanguage('en')}>
        EN
      </Button>
      <Button
        variant="outlined"
        onClick={async () => await setLanguage('zh-cn')}
      >
        ZH-CN
      </Button>
      <HelloWorld title={t('hello')} />
    </div>
  );
};

// ======================= EXPORT
export default HomeScreen;
