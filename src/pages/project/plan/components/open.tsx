import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Drawer, Tooltip } from 'antd';
import { ApartmentOutlined, CloseOutlined } from '@ant-design/icons';
import PlanModelBuilder from './model';

type Props = {
  projectId: number;
  planId: string;
  name: string;
};
const PlanOpen: FC<Props> = ({ projectId, planId, name }) => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [modelId, setModelId] = useState(planId);
  const [planModelBuilder, setPlanModelBuilder] = useState<JSX.Element>();

  useEffect(() => {
    if (drawerVisible) {
      setPlanModelBuilder(
        <PlanModelBuilder projectId={projectId} planId={modelId} setModelId={setModelId} />,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerVisible, modelId]);

  return (
    <>
      <Tooltip title="Open model">
        <Button
          shape="circle"
          size="small"
          icon={<ApartmentOutlined />}
          onClick={() => handleDrawerVisible(true)}
        />
      </Tooltip>
      <Drawer
        push={false}
        title={`Model Builder (${name})`}
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
      >
        {planModelBuilder}
      </Drawer>
    </>
  );
};

export default PlanOpen;
