import { Col, Row, message } from 'antd';
import type { FC } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getProcessById, updateProcess } from '@/services/process/api';
import type { Process } from '@/services/process/data';
import ProCard from '@ant-design/pro-card';
import ParameterCard from './parameter';
import InputCard from './input';
import OutputCard from './output';

type EditProps = {
  location: {
    query: {
      projectid: number;
      id: string;
    };
  };
};

const AdvancedForm: FC<EditProps> = (porps) => {
  const { projectid, id } = porps.location.query;
  const [editProcess, setEditProcess] = useState<Process>();
  const formRef = useRef<ProFormInstance>();

  if (!editProcess) {
    getProcessById(projectid, id).then(async (result) => {
      setEditProcess(result);
      formRef?.current?.setFieldsValue(result);
    });
  }
  return (
    <PageContainer>
      <ProCard bordered={false}>
        <ProForm
          formRef={formRef}
          onFinish={async (values) => {
            if (editProcess) {
              updateProcess({ ...values, pkid: editProcess.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
                } else {
                  message.error(result);
                }
              });
              return true;
            }
            return false;
          }}
          onReset={() => {
            getProcessById(projectid, id).then(async (result) => {
              setEditProcess(result);
              formRef?.current?.setFieldsValue(result);
            });
          }}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="name" label="Name" />
            </Col>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="type" label="Type" />
            </Col>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="nation" label="Nation" />
            </Col>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="comment" label="Comment" />
            </Col>
          </Row>
        </ProForm>
      </ProCard>
      <ParameterCard projectId={projectid} processId={id} />
      <InputCard projectId={projectid} processId={id} />
      <OutputCard projectId={projectid} processId={id} />
    </PageContainer>
  );
};

export default AdvancedForm;
