import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import type { FC } from 'react';
import { useCallback, useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormText } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import { createPlanModelFlow } from '@/services/plan/api';
import ModelFlowSelect from './select';

type Props = {
  projectId: number;
  planId: string;
  sourceId: string;
  targetId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const CreateEdgeFlow: FC<Props> = ({ projectId, planId, sourceId, targetId, actionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefCreate = useRef<ProFormInstance>();

  const reload = useCallback(() => {
    actionRef.current?.reload();
  }, [actionRef]);

  return (
    // <Tooltip title="Create">
    //   <Button
    //     size={'middle'}
    //     type="text"
    //     icon={<PlusOutlined />}
    //     onClick={() => {
    //       createEdgeProcess({
    //         projectId,
    //         planId: modelId,
    //         sourceProcessId: sourceId,
    //         targetProcessId: targetId,
    //       }).then(async (result) => {
    //         if (result === 'ok') {
    //           message.success('Successfully Created!');
    //           reload();
    //         } else {
    //           message.error(result);
    //         }
    //       });
    //     }}
    //   />
    // </Tooltip>

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
        title="Create"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefCreate}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createPlanModelFlow({
              ...values,
              projectId,
              planId,
              edgeSourceId: sourceId,
              edgeTargetId: targetId,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success('Create successfully!');
                setDrawerVisible(false);
                reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <Divider>
            Source Flow
            <ModelFlowSelect
              projectId={projectId}
              processId={sourceId}
              input={false}
              formRef={formRefCreate}
            />
          </Divider>
          <ProFormText width="md" name="flowSourceId" label="Flow Source Id" hidden={true} />
          <ProFormText width="md" name="flowSourceName" label="Flow Name" />
          <Divider>
            Target Flow
            <ModelFlowSelect
              projectId={projectId}
              processId={targetId}
              input={true}
              formRef={formRefCreate}
            />
          </Divider>
          <ProFormText width="md" name="flowTargetId" label="Flow Target Id" hidden={true} />
          <ProFormText width="md" name="flowTargetName" label="Flow Name" />
        </ProForm>
      </Drawer>
    </>
  );
};
export default CreateEdgeFlow;
