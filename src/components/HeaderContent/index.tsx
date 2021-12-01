import styles from '@/style/custom.less';
import type { FC } from 'react';

type Props = {
  title: string;
};
const HeaderContent: FC<Props> = ({ title }) => {
  return <div className={styles.electron_drag}>{title}</div>;
};
export default HeaderContent;
