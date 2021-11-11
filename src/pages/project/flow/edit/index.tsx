import { Col, Row, message } from 'antd';
import type { FC } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { FlowBase } from '@/services/flowbase/data';
import { getFlowBase, updateFlowBase } from '@/services/flowbase/api';
import MeasurementList from './measurement';

type Props = {
  location: {
    query: {
      project: number;
      id: string;
    };
  };
};

const AdvancedForm: FC<Props> = (porps) => {
  const { project, id } = porps.location.query;
  const [editFlowBase, setEditFlowBase] = useState<FlowBase>();
  const formRef = useRef<ProFormInstance>();

  if (!editFlowBase) {
    getFlowBase(project, id).then(async (result) => {
      setEditFlowBase(result);
      formRef?.current?.setFieldsValue(result);
    });
  }
  return (
    <PageContainer>
      <ProCard bordered={false}>
        <ProForm
          formRef={formRef}
          onFinish={async (values) => {
            if (editFlowBase) {
              updateFlowBase({ ...values, pkid: editFlowBase.pkid }).then(async (result) => {
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
            getFlowBase(project, id).then(async (result) => {
              setEditFlowBase(result);
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
      <MeasurementList project={project} process={id} />
    </PageContainer>
  );
};

export default AdvancedForm;
