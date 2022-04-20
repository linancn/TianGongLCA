import { Input, TreeSelect } from 'antd';
import type { Dispatch, FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getPlanModelNodeTree } from '@/services/plan/api';
import { getProcessById } from '@/services/process/api';

type Props = {
  projectId: number;
  dataId: string;
  dataType: string;
  selectValue: string | undefined;
  setSelectValue: Dispatch<React.SetStateAction<string | undefined>>;
};

const SelectEdgeProcess: FC<Props> = ({
  projectId,
  dataId,
  dataType,
  selectValue,
  setSelectValue,
}) => {
  const [treeData, setTreeData] = useState<any>(undefined);
  const onChange = (value: any) => {
    setSelectValue(value);
  };

  useEffect(() => {
    if (dataType === 'plan')
      getPlanModelNodeTree(projectId, dataId).then((result) => {
        setTreeData(result);
      });
    else
      getProcessById(projectId, dataId).then((result) => {
        setSelectValue(dataId);
        setTreeData(result);
      });
  }, [dataId, dataType, projectId, setSelectValue]);
  if (dataType === 'plan')
    return (
      <TreeSelect
        showSearch
        treeNodeFilterProp="title"
        style={{ width: '100%' }}
        value={selectValue}
        treeData={
          treeData
            ? treeData.map((r: any) => {
                return {
                  id: `${r.parentId}_${r.nodeId}`,
                  pId: r.parentId,
                  title: r.nodeName,
                  value: `${r.parentId}_${r.nodeId}`,
                  isLeaf: r.hasChildren ? false : true,
                  selectable: r.nodeType === 'plan' ? false : true,
                };
              })
            : []
        }
        onChange={onChange}
        treeDataSimpleMode
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
      />
    );
  else return <Input value={treeData ? treeData.dataName : ''} disabled={true} />;
};
export default SelectEdgeProcess;
