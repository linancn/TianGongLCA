import { Button, Drawer, Input, TreeSelect } from 'antd';
import type { Dispatch, FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { getPlanModelNodeTree } from '@/services/plan/api';
import { getProcessById } from '@/services/process/api';

type Props = {
  projectId: number;
  modelId: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const EditEdgePlan: FC<Props> = ({
  projectId,
  // modelId,
  sourceId,
  sourceType,
  targetId,
  targetType,
  drawerVisible,
  setDrawerVisible,
}) => {
  const [sourceValue, setSourceValue] = useState(undefined);
  const [targetValue, setTargetValue] = useState(undefined);
  const [sourceTreeData, setSourceTreeData] = useState(undefined);
  const [targetTreeData, setTargetTreeData] = useState(undefined);
  const [sourceCard, setSourceCard] = useState<JSX.Element>();
  const [targetCard, setTargetCard] = useState<JSX.Element>();
  const onSourceChange = () => {
    setSourceValue(sourceValue);
  };
  const onTargetChange = () => {
    setTargetValue(targetValue);
  };
  const loadSourceData = () => {
    getPlanModelNodeTree(projectId, sourceId).then(async (result) => {
      setSourceTreeData(
        result.map((r: any) => {
          return {
            id: `${r.parentId}_${r.nodeId}`,
            pId: r.parentId,
            title: r.nodeName,
            value: `${r.parentId}_${r.nodeId}`,
            isLeaf: r.hasChildren ? false : true,
            selectable: r.nodeType === 'plan' ? false : true,
          };
        }),
      );
    });
  };
  const loadTargetData = () => {
    getPlanModelNodeTree(projectId, targetId).then(async (result) => {
      setTargetTreeData(
        result.map((r: any) => {
          return {
            id: `${r.parentId}_${r.nodeId}`,
            pId: r.parentId,
            title: r.nodeName,
            value: `${r.parentId}_${r.nodeId}`,
            isLeaf: r.hasChildren ? false : true,
            selectable: r.nodeType === 'plan' ? false : true,
          };
        }),
      );
    });
  };

  const setCard = () => {
    if (sourceType === 'plan') {
      setSourceCard(
        <>
          <TreeSelect
            showSearch
            treeNodeFilterProp="title"
            style={{ width: '100%' }}
            value={sourceValue}
            treeData={sourceTreeData}
            onChange={onSourceChange}
            treeDataSimpleMode
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
          />
          <Button style={{ marginLeft: '10px' }} onClick={() => {}}>
            OK
          </Button>
        </>,
      );
    } else {
      getProcessById(projectId, sourceId).then((result) => {
        setSourceCard(<Input value={result.dataName} disabled={true} />);
      });
    }
    if (targetType === 'plan') {
      setTargetCard(
        <>
          <TreeSelect
            showSearch
            treeNodeFilterProp="title"
            style={{ width: '100%' }}
            value={targetValue}
            treeData={targetTreeData}
            onChange={onTargetChange}
            treeDataSimpleMode
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
          />
          <Button style={{ marginLeft: '10px' }} onClick={() => {}}>
            OK
          </Button>
        </>,
      );
    } else {
      getProcessById(projectId, targetId).then((result) => {
        setTargetCard(<Input value={result.dataName} disabled={true} />);
      });
    }
  };

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  useEffect(() => {
    loadSourceData();
    loadTargetData();
    setCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Drawer
      visible={drawerVisible}
      maskClosable={false}
      title="Edit"
      width="100%"
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      onClose={callbackDrawerVisible}
    >
      <ProCard ghost gutter={[0, 8]}>
        <ProCard colSpan={12} title="Source Process" layout="center" bordered>
          {sourceCard}
        </ProCard>
        <ProCard colSpan={12} title="Target Process" layout="center" bordered>
          {targetCard}
        </ProCard>
      </ProCard>
    </Drawer>
  );
};
export default EditEdgePlan;
