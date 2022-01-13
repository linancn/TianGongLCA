import { Button, Drawer, Form, Input, InputNumber, Popover, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormText } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import { CloseOutlined } from '@ant-design/icons';
import type { IApplication, NsEdgeCmd } from '@antv/xflow';
import { XFlowEdgeCommands } from '@antv/xflow';
import { MODELS } from '@antv/xflow';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { presetColors } from '../config/sketchpicker';

type Props = {
  xflowApp: IApplication | undefined;
  label: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  config: any;
};

const DesignEdge: FC<Props> = ({ xflowApp, label, drawerVisible, setDrawerVisible }) => {
  const formRef = useRef<ProFormInstance>();
  const [isPopoverVisibleLC, setIsPopoverVisibleLC] = useState(false);
  const [colorLC, setColorLC] = useState('#000000');
  const rStyles = reactCSS({
    default: {
      lineColor: {
        background: `${colorLC}`,
        width: '100px',
        height: '10px',
      },
    },
  });
  const onFocusLC = () => {
    setIsPopoverVisibleLC(true);
  };
  const onSketchPickerChangeLC = (color: any) => {
    setColorLC(color.hex);
    formRef?.current?.setFieldsValue({
      ...formRef?.current?.getFieldsValue(),
      lineColor: color.hex,
    });
  };
  const onPopoverCloseLC = () => {
    setIsPopoverVisibleLC(false);
  };

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const getCell = async () => {
    if (xflowApp) {
      const cell = await (await MODELS.SELECTED_CELL.useValue(xflowApp.modelService)).data;
      formRef.current?.setFieldsValue({
        label: cell.attrs.label.text,
        lineColor: cell.attrs.line.stroke,
        lineWidth: cell.attrs.line.strokeWidth,
        markerWidth: cell.attrs.line.targetMarker.width,
        markerHeight: cell.attrs.line.targetMarker.height,
        markerOffset: cell.attrs.line.targetMarker.offset,
      });
      setColorLC(cell.attrs.line.stroke);
    }
  };

  const updateCell = async (values: any) => {
    if (xflowApp) {
      const cell = await (await MODELS.SELECTED_CELL.useValue(xflowApp.modelService)).data;
      const config = {
        ...cell,
        attrs: {
          ...cell.attrs,
          line: {
            ...cell.attrs.line,
            stroke: values.lineColor,
            strokeWidth: values.lineWidth,
            targetMarker: {
              ...cell.attrs.line.targetMarker,
              width: values.markerWidth,
              height: values.markerHeight,
              offset: values.markerOffset,
            },
          },
          label: {
            ...cell.attrs.label,
            text: values.label,
          },
        },
      };
      xflowApp.commandService.executeCommand<NsEdgeCmd.UpdateEdge.IArgs>(
        XFlowEdgeCommands.UPDATE_EDGE.id,
        {
          edgeConfig: config,
        },
      );
    }
  };

  useEffect(() => {
    getCell();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      visible={drawerVisible}
      maskClosable={false}
      title={`Design (${label})`}
      width="400px"
      onClose={callbackDrawerVisible}
      footer={
        <Space size={'middle'} className={styles.footer_right}>
          <Button onClick={() => formRef.current?.submit()} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <ProForm
        formRef={formRef}
        submitter={{
          render: () => {
            return [];
          },
        }}
        onFinish={async (values) => {
          updateCell(values);
          callbackDrawerVisible();
        }}
      >
        <ProFormText width="md" name="label" label="Label" />
        <Form.Item name="lineWidth" label="Line Width">
          <InputNumber style={{ width: '328px' }} />
        </Form.Item>
        <Popover
          title={
            <>
              Color Picker
              <CloseOutlined style={{ marginLeft: '160px' }} onClick={onPopoverCloseLC} />
            </>
          }
          placement="bottomLeft"
          content={
            <SketchPicker
              presetColors={presetColors}
              width={'230px'}
              color={colorLC}
              onChange={onSketchPickerChangeLC}
            />
          }
          visible={isPopoverVisibleLC}
        >
          <Form.Item name="lineColor" label="Line Color">
            <Input
              style={{ width: '328px' }}
              addonAfter={<div style={rStyles.lineColor} />}
              onFocus={onFocusLC}
            />
          </Form.Item>
        </Popover>
        <Form.Item name="markerWidth" label="Marker Width">
          <InputNumber style={{ width: '328px' }} />
        </Form.Item>
        <Form.Item name="markerHeight" label="Marker Height">
          <InputNumber style={{ width: '328px' }} />
        </Form.Item>
        <Form.Item name="markerOffset" label="Marker Offset">
          <InputNumber style={{ width: '328px' }} />
        </Form.Item>
      </ProForm>
    </Drawer>
  );
};
export default DesignEdge;
