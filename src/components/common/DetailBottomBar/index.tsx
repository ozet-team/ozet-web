import React, { useEffect } from 'react';
import { OzetButton } from '../OzetButton/styled';
import {
  BookMarkBox,
  DetailFooterWrapper,
  FooterButtonWrapper,
  FooterFade,
  FooterInner,
} from './styled';
import BookMark from '../../../img/BookMark';
import API from '../../../api/index';

const DetailBottomBar = (props: { id: string }) => {
  const { id } = props;
  const [isBookMark, setIsBookMark] = React.useState(false);
  console.log(isBookMark);
  const getBookmarkHandler = () => {
    API.getBookMark().then((res) => {
      if (res.data) {
        const isBookMark = res.data.map((data) =>
          data.announcement.id.toString(),
        );
        setIsBookMark(isBookMark.includes(id));
      }
    });
    console.log(id);
  };
  useEffect(() => {
    getBookmarkHandler();
  }, []);
  const bookmarkHandler = () => {
    if (isBookMark) {
      API.deleteBookMark(id).then(() => {
        setIsBookMark(false);
      });
    } else {
      API.postBookMark({ announcementId: id }).then(() => {
        setIsBookMark(true);
      });
    }
  };

  return (
    <DetailFooterWrapper>
      <FooterFade />
      <FooterInner>
        <BookMarkBox
          onClick={() => {
            bookmarkHandler();
          }}
        >
          <BookMark fill={isBookMark ? '#5d2fff' : '#D7D8DB'} />
        </BookMarkBox>
        <FooterButtonWrapper>
          <OzetButton>이력서 전송</OzetButton>
        </FooterButtonWrapper>
      </FooterInner>
    </DetailFooterWrapper>
  );
};

export default DetailBottomBar;
