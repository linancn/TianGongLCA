import type { FC } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteFlowPropertyJson } from '@/services/flow/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  flowId: string;
  propertyId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowPropertyJsonDelete: FC<Props> = ({ projectId, flowId, propertyId, actionRef }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    deleteFlowPropertyJson(projectId, flowId, propertyId).then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="flowproperty.deletesuccess"
            defaultMessage="Delete successfully!"
          />,
        );
        setIsModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result);
      }
    });
  }, [actionRef, flowId, projectId, propertyId]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}>
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={showModal} />
        <Modal
          title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <FormattedMessage
            id="flowproperty.delete"
            defaultMessage="Are you sure you want to delete this flow property?"
          />
        </Modal>
      </Tooltip>
    </>
  );
};

export default FlowPropertyJsonDelete;
