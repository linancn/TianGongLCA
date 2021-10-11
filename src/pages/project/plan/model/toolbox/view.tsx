import type { PlanInfo } from '@/services/plan/api.d';
import { getPlanInfo } from '@/services/plan/api';
import { Button, Descriptions, Drawer } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode } from 'react-flow-renderer';
import moment from 'moment';

type viewProps = {
  project: number;
  selectedElements: Elements<any> | null;
};

let preid = '';

const View: FC<viewProps> = ({ project, selectedElements }) => {
  const [viewPlan, setViewPlan] = useState<PlanInfo>();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const onView = () => {
    setIsDrawerVisible(true);
  };
  const handleDrawerAddCancel = () => {
    setIsDrawerVisible(false);
  };
  if (!selectedElements) {
    return (
      <Button key="View" block disabled={true}>
        View
      </Button>
    );
  }
  if (isDrawerVisible) {
    if (preid !== selectedElements[0].id) {
      preid = selectedElements[0].id;
      if (isNode(selectedElements[0]) && selectedElements[0].data.type === 'plan') {
        getPlanInfo(project, preid).then(async (result) => {
          setViewPlan(result);
        });
      }
    }
  } else {
    preid = '';
  }

  return (
    <>
      <Button key="View" onClick={onView} block>
        View
      </Button>
      <Drawer
        visible={isDrawerVisible}
        mask={false}
        title="View"
        width="400px"
        onClose={handleDrawerAddCancel}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{viewPlan?.name}</Descriptions.Item>
          <Descriptions.Item label="Type">{viewPlan?.type}</Descriptions.Item>
          <Descriptions.Item label="Nation">{viewPlan?.nation}</Descriptions.Item>
          <Descriptions.Item label="Last Update">
            {moment(viewPlan?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Comment">{viewPlan?.comment}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default View;
