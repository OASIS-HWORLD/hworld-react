import styled from 'styled-components';

/**
 * 장바구니 페이지 styled components
 * @author 조영욱
 * @since 2024.09.12
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.12  	조영욱        최초 생성
 * </pre>
 */

export const ContentContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const PurchaseContainer = styled.div`
  width: 50vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  font-size: 28px;
  font-weight: bold;
  align-items: center;
  margin-top: 4%;
`;

export const PurchaseButton = styled.button`
  border-radius: 50px;
  background-color: #284180;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 20px 55px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  margin-top: 4%;
  &:hover {
    background-color: rgba(40, 65, 128, 0.9);
    transform: scale(1);
    cursor: pointer;
  }
`;
