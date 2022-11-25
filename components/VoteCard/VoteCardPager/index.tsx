import React from 'react';

interface VoteCardPagerProps {
  onRightArrowClick: () => void;
  onLeftArrowClick: () => void;
  isRightArrowDisabled: boolean;
  isLeftArrowDisabled: boolean;
  numPages: number;
  currentPage: number;
}

const VoteCardPager: React.FC<VoteCardPagerProps> = (props) => {
  const {
    onRightArrowClick,
    onLeftArrowClick,
    isRightArrowDisabled,
    isLeftArrowDisabled,
    numPages,
    currentPage,
  } = props;

  const isOnePage = numPages === 1;

  return (
    <>
      Pager
      {/*/!* Dots *!/*/}
      {/*<div*/}
      {/*  className={clsx(classes.pageDots, isOnePage ? classes.disabled : '')}*/}
      {/*>*/}
      {/*  {Array.from(Array(numPages).keys()).map((n: number) => {*/}
      {/*    return (*/}
      {/*      <span className={n === currentPage ? '' : classes.disabledPageDot}>*/}
      {/*        •*/}
      {/*      </span>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
      {/*/!* Arrows *!/*/}
      {/*<div*/}
      {/*  className={clsx(*/}
      {/*    classes.paginationArrowsWrapper,*/}
      {/*    isOnePage ? classes.disabled : ''*/}
      {/*  )}*/}
      {/*>*/}
      {/*  <button*/}
      {/*    className={classes.paginationArrowBtnWrapper}*/}
      {/*    disabled={isLeftArrowDisabled || isOnePage}*/}
      {/*    onClick={onLeftArrowClick}*/}
      {/*  >*/}
      {/*    <ChevronLeftIcon className={classes.paginationArrow} />*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    disabled={isRightArrowDisabled || isOnePage}*/}
      {/*    onClick={onRightArrowClick}*/}
      {/*    className={classes.paginationArrowBtnWrapper}*/}
      {/*  >*/}
      {/*    <ChevronRightIcon className={classes.paginationArrow} />*/}
      {/*  </button>*/}
      {/*</div>*/}
    </>
  );
};

export default VoteCardPager;
