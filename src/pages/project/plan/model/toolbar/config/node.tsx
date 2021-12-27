import './index.less';
import './node.less';

export const Attrs = (text: string) => {
  const attrs = {
    body: {
      fill: '#fff',
      stroke: '#177ddc',
      strokeWidth: '1',
      strokeLinejoin: 'round',
    },
    label: {
      text,
      fill: '#000',
      fontSize: 12,
    },
  };
  return attrs;
};

export const Ports = (nodeId: string) => {
  const ports = {
    groups: {
      top: {
        attrs: {
          circle: {
            r: 4,
            magnet: true,
          },
        },
        position: {
          name: 'top',
        },
        zIndex: 10,
      },
      bottom: {
        attrs: {
          circle: {
            r: 4,
            magnet: true,
          },
        },
        position: {
          name: 'bottom',
        },
        zIndex: 10,
      },
      left: {
        attrs: {
          circle: {
            r: 4,
            magnet: true,
          },
        },
        position: {
          name: 'left',
        },
        zIndex: 10,
      },
      right: {
        attrs: {
          circle: {
            r: 4,
            magnet: true,
          },
        },
        position: {
          name: 'right',
        },
        zIndex: 10,
      },
    },
    items: [
      {
        group: 'top',
        id: nodeId + '-t',
      },
      {
        group: 'bottom',
        id: nodeId + '-b',
      },
      {
        group: 'left',
        id: nodeId + '-l',
      },
      {
        group: 'right',
        id: nodeId + '-r',
      },
    ],
  };
  return ports;
};
