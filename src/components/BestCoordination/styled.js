import styled from 'styled-components';

/**
 * 베스트 코디 styled components
 * @author 조영욱
 * @since 2024.09.11
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.11  	조영욱        최초 생성
 * </pre>
 */

export const PostContainer = styled.div`
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
`;

export const CoordinationImage = styled.img`
  width: 100%;
  height: 85%;

  &:hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 6.4vh;
  box-sizing: border-box;
  padding-left: 8%;
  padding-right: 8%;
`;

export const RecommendSection = styled.div`
  display: flex;
  width: 3.8vw;
  justify-content: space-between;
  align-items: center;
`;

export const RecommendButton = styled.button`
  display: inline-flex;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 45%;
  height: auto;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
`;

export const HeartIcon = styled.img`
  display: block;
  width: 2.3vw;
  height: auto;
  padding: 0;
`;

export const CommentSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 3.8vw;
  /* border: 1px solid red; */
`;

export const CommentIcon = styled.img`
  display: flex;
  width: 2vw;
  height: auto;
`;
