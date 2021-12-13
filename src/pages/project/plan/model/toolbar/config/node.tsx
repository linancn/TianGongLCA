import './index.less';
import './dndnode.less';

export const Component = () => {
  return <div />;
};

export const Attrs = () => {
  const attrs = {
    body: {
      stroke: '#1890ff',
      fill: '#fff',
      strokeWidth: '1',
      strokeLinejoin: 'round',
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
            fill: '#fff',
            magnet: true,
            r: 4,
            stroke: '#31d0c6',
            strokeWidth: 2,
            style: {
              visibility: 'hidden',
            },
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
            fill: '#fff',
            magnet: true,
            r: 4,
            stroke: '#31d0c6',
            strokeWidth: 2,
            style: {
              visibility: 'hidden',
            },
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
            fill: '#fff',
            magnet: true,
            r: 4,
            stroke: '#31d0c6',
            strokeWidth: 2,
            style: {
              visibility: 'hidden',
            },
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
            fill: '#fff',
            magnet: true,
            r: 4,
            stroke: '#31d0c6',
            strokeWidth: 2,
            style: {
              visibility: 'hidden',
            },
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
