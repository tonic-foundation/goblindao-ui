import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import tw, { styled } from 'twin.macro';

const Tooltip = styled(ReactTooltip)(
  tw`opacity-100 z-50 bg-gray-900 dark:bg-fuchsia-600`
);

export default Tooltip;
