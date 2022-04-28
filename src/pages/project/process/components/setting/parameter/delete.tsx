import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteParameterJson } from '@/services/process/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processId: string;
  id: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const ParameterJsonDelete: FC<Props> = ({ projectId, processId, id, actionRef }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    deleteParameterJson({ projectId, processId, id }).then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="parameter.deletesuccess"
            defaultMessage="Selected parameter has been deleted."
          />,
        );
        setIsModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result);
      }
    });
  }, [actionRef, id, processId, projectId]);

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
            id="parameter.delete"
            defaultMessage="Are you sure you want to delete this parameter?"
          />
        </Modal>
      </Tooltip>
    </>
  );
};

export default ParameterJsonDelete;
