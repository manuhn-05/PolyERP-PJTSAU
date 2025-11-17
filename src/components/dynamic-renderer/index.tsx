import dynamic from 'next/dynamic';
import React, { ComponentType, useMemo } from 'react'
import { LayoutComponent } from '../selected-modules/_components/constants';
import DefaultCrudComponents from "@/components/dynamic-renderer/table/default-components";

type DynamicComponentRendererProps = {
  layout: Array<LayoutComponent>;
  path: string;
  listOfData: any;
  components?: ComponentType<any>[];
};

// todo : Enable card component for PolyERP
// type ComponentTypeKey = 'table' | 'chart' | 'card';
type ComponentTypeKey = 'table' ;

//  Safe dynamic imports (load once, no SSR)
const TableComponent = dynamic(() => import("@/components/dynamic-renderer/table"), { ssr: false });
// const ChartComponent = dynamic(() => import("@/components/dynamic-renderer/chart"), { ssr: false });
// const CardComponent = dynamic(() => import("@/components/dynamic-renderer/card"), { ssr: false });

const componentRegistry: Record<ComponentTypeKey, React.ComponentType<any>> = {
  table: TableComponent,
  // chart: ChartComponent,
  // card: CardComponent,
};

const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({
  layout,
  path,
  listOfData,
  components
}) => {
  const defaultComponents = useMemo(
    () => [(props: any) => <DefaultCrudComponents {...props} isItButton={true} />],
    []
  );
  
  const finalComponents = (components && components.length > 0) ? components : defaultComponents;

  // Always call hooks before any conditional return
  const renderedLayout = useMemo(() => {
    if (!Array.isArray(layout) || layout.length === 0) {
      return null;
    }

    return layout.map((item: any, idx: number) => {
      const Component = componentRegistry[item?.type as ComponentTypeKey];
      if (!Component) return null;

      return (
        <div key={idx}>

          <Component
            tableBody={listOfData}
            endpoint={path}
            {...item.props}
            components={finalComponents}
            search={item?.search ?? []}
          />
        </div>
      );
    });
  }, [layout, listOfData, path,]);

  if (!renderedLayout) {
    return <p>This module has not been configured yet. Please complete the configuration to continue.</p>;
  }

  return <div>

    {renderedLayout}
    
    </div>;
};


export default DynamicComponentRenderer;
