import React, { memo, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import Iconfont from '../Iconfont';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { IDatabase } from '@/types'
import { databaseType } from '@/utils/constants';
import ConnectionDialog from '@/components/ConnectionDialog';

interface Iprops {
  className?: string;
}

type MenuItem = {
  label: React.ReactNode,
  key: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
}

function getItem(
  label: React.ReactNode,
  key: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

const newDataSourceChildren = Object.keys(databaseType).map(t => {
  const source: IDatabase = databaseType[t]
  return getItem(source.name, source.code, <img className={styles.dataSourceTypeImg} src={source.img} alt="" />)
})


type IGlobalAddMenuItem = {

} & MenuItem


const globalAddMenuList: IGlobalAddMenuItem[] = [
  {
    label: '新建控制台',
    key: 'newConsole',
    icon: <Iconfont code='&#xe619;' />
  },
  {
    label: '新建链接',
    key: 'newDataSource',
    icon: <Iconfont code='&#xe631;' />,
    children: newDataSourceChildren
  },

]

const items: MenuItem[] = globalAddMenuList.map(t => getItem(t.label, t.key, t.icon, t.children))



export default memo<Iprops>(function GlobalAddMenu(props) {
  const { className } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log(e)
    if (e.keyPath[1] === 'newDataSource') {
      setIsModalVisible(true);
    }
  };

  return <div className={classnames(styles.box, className)}>
    <Menu onClick={onClick} mode="vertical" items={items as any} />
    <ConnectionDialog entheticIsModalVisible={isModalVisible}></ConnectionDialog>
  </div>
})
