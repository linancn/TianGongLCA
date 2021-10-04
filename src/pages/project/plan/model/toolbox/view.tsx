import type { PlanInfo } from '@/services/plan/list.d';
import { getPlanInfo } from '@/services/plan/list';
import { Button, Descriptions, Drawer } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { isNode, useStoreState } from 'react-flow-renderer';
import moment from 'moment';

type viewProps = {
  project: number;
};

let preid = '';

const View: FC<viewProps> = ({ project }) => {
  const selectedElements = useStoreState((store) => store.selectedElements);
  const [viewPlan, setViewPlan] = useState<PlanInfo>();
  const [isDrawerViewVisible, setIsDrawerViewVisible] = useState(false);

  const onView = () => {
    setIsDrawerViewVisible(true);
  };
  const handleDrawerAddCancel = () => {
    setIsDrawerViewVisible(false);
  };
  if (isDrawerViewVisible && selectedElements != null) {
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
        visible={isDrawerViewVisible}
        mask={false}
        title="View"
        width="400px"
        onClose={handleDrawerAddCancel}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{viewPlan?.name}</Descriptions.Item>
          <Descriptions.Item label="Type">{viewPlan?.comment}</Descriptions.Item>
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
