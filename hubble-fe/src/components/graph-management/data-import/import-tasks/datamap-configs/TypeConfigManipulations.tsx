import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@baidu/one-ui';

interface TypeConfigManipulationsProps {
  type: 'vertex' | 'edge';
  status: 'add' | 'edit';
  onCreate: () => void;
  onCancel: () => void;
}

const TypeConfigManipulations: React.FC<TypeConfigManipulationsProps> = observer(
  ({ type, status, onCreate, onCancel }) => {
    const { t } = useTranslation();

    return (
      <div
        className="import-tasks-data-options"
        style={{ marginTop: 40, marginBottom: 0 }}
      >
        <span className="import-tasks-data-options-title in-card"></span>
        <div
          className="import-tasks-data-type-manipulations"
          style={{ margin: 0 }}
        >
          <Button
            type="primary"
            size="medium"
            style={{ marginRight: 16 }}
            onClick={onCreate}
          >
            {status === 'add'
              ? t('data-configs.type.manipulation.create')
              : t('data-configs.type.manipulation.save')}
          </Button>
          <Button size="medium" onClick={onCancel}>
            {t('data-configs.type.manipulation.cancel')}
          </Button>
        </div>
      </div>
    );
  }
);

export default TypeConfigManipulations;
