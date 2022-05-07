import { Button, Drawer, Tooltip } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import EditEdgeFlow from './flow';
import SelectEdgeProcess from './select';
import type { ActionType } from '@ant-design/pro-table';

type Props = {
  projectId: number;
  modelId: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const CreateEdgeProcess: FC<Props> = ({
  projectId,
  modelId,
  sourceId,
  sourceType,
  targetId,
  targetType,
  actionRef,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [sourceValue, setSourceValue] = useState<string>();
  const [targetValue, setTargetValue] = useState<string>();

  const [planSourceId, setPlanSourceId] = useState<string>('');
  const [planTargetId, setPlanTargetId] = useState<string>('');

  const [processSourceId, setProcessSourceId] = useState<string>();
  const [processTargetId, setProcessTargetId] = useState<string>();

  const onClose = () => {
    setDrawerVisible(false);
    actionRef.current?.reload();
  };

  useEffect(() => {
    if (sourceValue) {
      const idList = sourceValue.split('_');
      setProcessSourceId(idList[idList.length - 1]);
      if (idList.length > 2) {
        let planId = idList[1];
        for (let i = 2; i < idList.length - 1; i++) {
          planId = planId + '_' + idList[i];
        }
        setPlanSourceId(planId);
      }
    } else setProcessSourceId(undefined);

    if (targetValue) {
      const idList = targetValue.split('_');
      setProcessTargetId(idList[idList.length - 1]);
      if (idList.length > 2) {
        let planId = idList[1];
        for (let i = 2; i < idList.length - 1; i++) {
          planId = planId + '_' + idList[i];
        }
        setPlanTargetId(planId);
      }
    } else setProcessTargetId(undefined);
  }, [sourceValue, targetValue]);

  return (
    <>
      <Tooltip title="Create">
        <Button
          size={'middle'}
          type="text"
          icon={<PlusOutlined />}
          onClick={() => {
            setDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        visible={drawerVisible}
        maskClosable={false}
        title="Create"
        width="100%"
        closable={false}
        extra={<Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={onClose} />}
        onClose={onClose}
      >
        <ProCard ghost gutter={[0, 8]} aria-disabled={false}>
          <ProCard colSpan={12} title="Source Process" layout="center" bordered>
            <SelectEdgeProcess
              projectId={projectId}
              dataId={sourceId}
              dataType={sourceType}
              selectValue={sourceValue}
              setSelectValue={setSourceValue}
            />
          </ProCard>
          <ProCard colSpan={12} title="Target Process" layout="center" bordered>
            <SelectEdgeProcess
              projectId={projectId}
              dataId={targetId}
              dataType={targetType}
              selectValue={targetValue}
              setSelectValue={setTargetValue}
            />
          </ProCard>
        </ProCard>
        <EditEdgeFlow
          projectId={projectId}
          modelId={modelId}
          edgeSourceId={sourceId}
          edgeTargetId={targetId}
          planSourceId={planSourceId}
          planTargetId={planTargetId}
          processSourceId={processSourceId}
          processTargetId={processTargetId}
        />
      </Drawer>
    </>
  );
};
export default CreateEdgeProcess;
