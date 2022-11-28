import React from 'react';
import ReactTooltip, { TooltipProps as ReactTooltipProps } from 'react-tooltip';

interface TooltipProps extends ReactTooltipProps {
  hoverContent: (dataTip: string, id: string) => React.ReactNode;
  tip: string;
  id: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  hoverContent,
  tip,
  id,
  children,
  ...props
}) => {
  return (
    <>
      <ReactTooltip
        {...props}
        id={id}
        arrowColor={'rgba(0,0,0,0)'}
        effect={'solid'}
        getContent={(dataTip) => {
          return hoverContent(dataTip, id);
        }}
      />
      <div data-tip={tip} data-for={id}>
        {children}
      </div>
    </>
  );
};

export default Tooltip;
