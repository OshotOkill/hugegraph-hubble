import React, { useContext, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Drawer } from '@baidu/one-ui';

import { DataAnalyzeStoreContext } from '../../../stores';
import { GraphNode } from '../../../stores/GraphManagementStore/dataAnalyzeStore';

const DataAnalyzeDrawer: React.FC = observer(() => {
  const dataAnalyzeStore = useContext(DataAnalyzeStoreContext);

  const handleDrawerClose = useCallback(() => {
    dataAnalyzeStore.switchShowScreenInfo(false);
  }, [dataAnalyzeStore]);

  return (
    <Drawer
      title="数据详情"
      visible={dataAnalyzeStore.isShowGraphInfo}
      onClose={handleDrawerClose}
      mask={false}
    >
      <div className="data-analyze-graph-node-info">
        {dataAnalyzeStore.graphInfoDataSet === 'node' ? (
          <>
            <div className="data-analyze-graph-node-info-item">
              <div>顶点类型：</div>
              <div>{dataAnalyzeStore.selectedGraphData.label}</div>
            </div>
            <div className="data-analyze-graph-node-info-item">
              <div>顶点ID：</div>
              <div>{dataAnalyzeStore.selectedGraphData.id}</div>
            </div>
            <div>属性：</div>
            {Object.keys(dataAnalyzeStore.selectedGraphData.properties).map(
              key => (
                <div className="data-analyze-graph-node-info-item" key={key}>
                  <div>{key}</div>
                  <div>
                    {dataAnalyzeStore.selectedGraphData.properties[key]}
                  </div>
                </div>
              )
            )}
          </>
        ) : (
          <>
            <div className="data-analyze-graph-node-info-item">
              <div>边类型：</div>
              <div>{dataAnalyzeStore.selectedGraphLinkData.label}</div>
            </div>
            <div className="data-analyze-graph-node-info-item">
              <div>起点：</div>
              <div>
                {
                  (dataAnalyzeStore.selectedGraphLinkData.source as GraphNode)
                    .id
                }
              </div>
            </div>
            <div className="data-analyze-graph-node-info-item">
              <div>终点：</div>
              <div>
                {
                  (dataAnalyzeStore.selectedGraphLinkData.target as GraphNode)
                    .id
                }
              </div>
            </div>
            <div>属性：</div>
            {Object.keys(dataAnalyzeStore.selectedGraphLinkData.properties).map(
              key => (
                <div className="data-analyze-graph-node-info-item" key={key}>
                  <div>{key}</div>
                  <div>
                    {dataAnalyzeStore.selectedGraphLinkData.properties[key]}
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </Drawer>
  );
});

export default DataAnalyzeDrawer;
