import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRoute, useLocation, Params } from 'wouter';
import { chunk } from 'lodash-es';
import { Modal, Button } from '@baidu/one-ui';

import DataAnalyzeContent from './DataAnalyzeContent';
import DataAnalyzeInfoDrawer from './DataAnalyzeInfoDrawer';
import DynamicAddNode from './DynamicAddNode';
import DynamicAddEdge from './DynamicAddEdge';
import {
  AppStoreContext,
  GraphManagementStoreContext,
  DataAnalyzeStoreContext
} from '../../../stores';
import './DataAnalyze.less';
import {
  ShortestPathAllAlgorithmParams,
  AllPathAlgorithmParams
} from '../../../stores/types/GraphManagementStore/dataAnalyzeStore';
import { keys } from 'mobx';

const DataAnalyze: React.FC = observer(() => {
  const graphManagementStore = useContext(GraphManagementStoreContext);
  const appStore = useContext(AppStoreContext);
  const dataAnalyzeStore = useContext(DataAnalyzeStoreContext);
  const { algorithmAnalyzerStore } = dataAnalyzeStore;
  const [match, params] = useRoute('/graph-management/:id/data-analyze');
  const [matchWithAlgorithm, paramsWithAlgorithm] = useRoute(
    '/graph-management/:id/data-analyze/algorithm/:params*'
  );
  const [_, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (graphManagementStore.requestStatus.fetchIdList !== 'success') {
      graphManagementStore.fetchIdList();
    }

    return () => {
      dataAnalyzeStore.dispose();
    };
  }, [dataAnalyzeStore, graphManagementStore]);

  // Caution: Preitter will automatically add 'params' behind 'match' in array,
  // which is not equal each time
  /* eslint-disable */
  useEffect(() => {
    if (
      (match || matchWithAlgorithm) &&
      (params !== null || paramsWithAlgorithm !== null)
    ) {
      if (params !== null) {
        appStore.setCurrentId(Number(params.id));
        dataAnalyzeStore.setCurrentId(Number(params.id));
      }

      if (paramsWithAlgorithm !== null) {
        appStore.setCurrentId(Number(paramsWithAlgorithm.id));
        dataAnalyzeStore.setCurrentId(Number(paramsWithAlgorithm.id));
      }

      dataAnalyzeStore.fetchValueTypes();
      dataAnalyzeStore.fetchVertexTypes();
      dataAnalyzeStore.fetchEdgeTypes();
      dataAnalyzeStore.fetchAllNodeStyle();
      dataAnalyzeStore.fetchAllEdgeStyle();
    }
  }, [dataAnalyzeStore, match, params?.id]);

  useEffect(() => {
    if (matchWithAlgorithm !== null && paramsWithAlgorithm !== null) {
      const paramsChunks = paramsWithAlgorithm.params
        .split('&')
        .map((param) => param.split('='));
      const params: Record<string, string> = {};
      const algorithmName = paramsChunks.shift()?.[1];
      paramsChunks.forEach(([key, value]) => {
        params[key] = value;
      });

      switch (algorithmName) {
        case 'allshortpath': {
          const keys = Object.keys(
            algorithmAnalyzerStore.shortestPathAllParams
          ) as (keyof ShortestPathAllAlgorithmParams)[];

          dataAnalyzeStore.setCurrentTab('algorithm-analyze');
          algorithmAnalyzerStore.changeCurrentAlgorithm('shortest-path-all');
          paramsChunks.forEach(([key, value]) => {
            // cannot narrow type key to keyof ShortestPathAllAlgorithmParams
            // disable it for temp
            // @ts-ignore
            if (keys.includes(key)) {
              // @ts-ignore
              algorithmAnalyzerStore.mutateShortestPathAllParams(key, value);
            }
          });
          break;
        }
        case 'allpath':
          const keys = Object.keys(
            algorithmAnalyzerStore.allPathParams
          ) as (keyof AllPathAlgorithmParams)[];

          dataAnalyzeStore.setCurrentTab('algorithm-analyze');
          algorithmAnalyzerStore.changeCurrentAlgorithm('all-path');

          paramsChunks.forEach(([key, value]) => {
            // cannot narrow type key to keyof ShortestPathAllAlgorithmParams
            // disable it for temp
            // @ts-ignore
            if (keys.includes(key)) {
              // @ts-ignore
              algorithmAnalyzerStore.mutateAllPathParams(key, value);
            }
          });
          break;
      }
    }
  }, [paramsWithAlgorithm?.id]);

  return (
    <section className="data-analyze">
      <DataAnalyzeContent />
      <DataAnalyzeInfoDrawer />
      <DynamicAddNode />
      <DynamicAddEdge />
      <Modal
        title="无法访问"
        footer={[
          <Button
            size="medium"
            type="primary"
            style={{ width: 88 }}
            onClick={() => {
              setLocation('/');
            }}
          >
            返回首页
          </Button>
        ]}
        visible={Object.values(dataAnalyzeStore.errorInfo)
          .map(({ code }) => code)
          .includes(401)}
        destroyOnClose
        needCloseIcon={false}
      >
        <div style={{ color: '#333' }}>
          {dataAnalyzeStore.errorInfo.fetchExecutionLogs.message}
        </div>
      </Modal>
    </section>
  );
});

export default DataAnalyze;
