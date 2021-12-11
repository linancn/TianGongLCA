import type { FC } from 'react';
import styles from '@/style/custom.less';
import { Button, Drawer } from 'antd';

const Toolbox: FC = () => {
  const onSave = async () => {
    // console.log(graphScaleModel);
  };

  return (
    <>
      <Drawer
        visible={true}
        closable={false}
        mask={false}
        getContainer={false}
        push={false}
        style={{ position: 'absolute' }}
        width="150px"
      >
        <div className={styles.tools}>
          <Button key="Save" onClick={onSave} block>
            Save
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Toolbox;
