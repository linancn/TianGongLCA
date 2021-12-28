import './index.less';
import './node.less';

export const EdgeAttrs = () => {
  const attrs = {
    line: {
      stroke: '#d8d8d8',
      strokeWidth: 1,
      targetMarker: {
        name: 'block',
        width: 15,
        height: 10,
        offset: -7,
      },
    },
    label: {
      text: '',
    },
  };
  return attrs;
};

export const EdgeConnector = () => {
  const connector = {
    name: 'jumpover',
    args: {
      type: 'arc',
    },
  };
  return connector;
};

export const EdgeRouter = () => {
  const router = {
    name: 'manhattan',
  };
  return router;
};
