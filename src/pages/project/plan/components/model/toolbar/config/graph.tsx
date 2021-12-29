import { createGraphConfig } from '@antv/xflow';

export const useGraphConfig = createGraphConfig((config) => {
  config.setX6Config({
    grid: true,
    snapline: {
      enabled: true,
    },
    scaling: {
      min: 0.1,
      max: 10,
    },
    scroller: {
      enabled: false,
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
    },
    resizing: {
      enabled: true,
    },
    connecting: {
      snap: {
        radius: 50,
      },
      connector: {
        name: 'rounded',
        args: {
          radius: 50,
        },
      },
      router: {
        name: 'er',
      },
      allowBlank: false,
    },
  });
});
