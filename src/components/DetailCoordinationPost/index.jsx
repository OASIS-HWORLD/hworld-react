import React, { useState } from 'react';
import { axiosInstance } from '../../apis';
import { useNavigate } from 'react-router-dom';
import {
  PostContainer,
  CoordinationImage,
  Content,
  CommentSection,
  RecommendHeart,
  HeartIcon,
  RecommendSection,
} from './styled';
import HeartEmpty from '../../assets/images/heart-empty-icon.svg';
import HeartFull from '../../assets/images/heart-full-icon.svg';
import Text from '../../components/Text';
import RecommendButton from '../../components/RecommendButton';

/**
 * 게시글 상세보기용 코디 카드 컴포넌트
 * @author 정은찬
 * @since 2024.09.13
 * @version 1.0
 *
 * <pre>
 * 수정일       수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.13  	정은찬        최초 생성
 * </pre>
 */

const DetailCoordinationPost = ({ post }) => {
  const navigate = useNavigate();
  const [isRecommended, setIsRecommended] = useState(post.isRecommended);
  const [recommendCount, setRecommendCount] = useState(post.recommendCount);

  // 하트 버튼 클릭 시 API 호출 및 추천수 업데이트
  const handleRecommend = async (e) => {
    e.stopPropagation();
    try {
      const newRecommendState = !isRecommended;
      setIsRecommended(newRecommendState);
      setRecommendCount((prevCount) => (newRecommendState ? prevCount + 1 : prevCount - 1));

      if (newRecommendState === false) {
        await axiosInstance.delete(`/contest/recommend/${post.postId}`);
      } else {
        await axiosInstance.post(`/contest/recommend/${post.postId}`);
      }
    } catch (error) {
      // 로그인 안 돼있을 시 로그인 페이지로 이동
      if (error.response?.status === 403) {
        navigate('/log-in');
      }
    }
  };

  return (
    <PostContainer>
      <CoordinationImage src={post.postImageUrl} alt="코디 이미지" />
      <Content>
        <RecommendSection>
          <RecommendHeart>
            <HeartIcon src={isRecommended ? HeartFull : HeartEmpty} alt="하트 아이콘" />
          </RecommendHeart>
          <Text theme="content">{recommendCount}</Text>
        </RecommendSection>

        <CommentSection>
          <RecommendButton fontSize="20px" onClick={handleRecommend}>
            추천하기
          </RecommendButton>
        </CommentSection>
      </Content>
    </PostContainer>
  );
};

export default DetailCoordinationPost;
