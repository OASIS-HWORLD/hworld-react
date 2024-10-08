import React from 'react';

import {
  Layout,
  CoordinationLayout,
  CoordinationContainer,
  CoordinationImage,
  CustomBreadCrumb,
  CustomBreadCrumbTitle,
  CustomBreadCrumbLine,
  ItemLayout,
  ItemContainer,
  ItemImage,
  ItemText,
} from './styled';

import { useState } from 'react';
import { useQuery } from 'react-query';

import MyPageAPI from '../../../apis/Member/MyPageAPI';
import Spinner from '../../../components/Spinner';
import Text from '../../../components/Text';
import ItemDetailModal from '../../../components/ItemDetailModal';

/**
 * 마이페이지 내 코디 조회 페이지
 * @author 김지현
 * @since 2024.09.12
 * @version 1.0
 *
 * <pre>
 * 수정일        수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.12  	김지현        최초 생성
 * </pre>
 */

const fetchMemberCoordination = async () => {
  const response = await MyPageAPI.getMemberCoordination();
  return response.data;
};

const fetchMemberCoordinationItem = async (coordinationId) => {
  const response = await MyPageAPI.getMemberCoordinationItem(coordinationId);
  return response.data;
};

const Coordination = React.memo(({ coordination, onClick, isSelected }) => (
  <CoordinationContainer onClick={() => onClick(coordination.coordinationId)} isSelected={isSelected}>
    <CoordinationImage src={coordination.imageUrl} alt="코디 이미지" />
  </CoordinationContainer>
));

const Item = ({ item }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case 1:
        return '모자';
      case 2:
        return '목걸이';
      case 3:
        return '안경';
      case 4:
        return '가방';
      default:
        return '기타';
    }
  };

  return (
    <ItemContainer>
      <ItemImage src={item.imageUrl} alt="아이템 이미지" onClick={() => handleItemClick(item.itemId)} />
      {isModalOpen && selectedItemId && <ItemDetailModal itemId={selectedItemId} onClose={handleCloseModal} />}
      <ItemText>{getCategoryName(item.categoryId)}</ItemText>
    </ItemContainer>
  );
};

const Menu2 = () => {
  const [selectedCoordinationId, setSelectedCoordinationId] = useState(null);

  const {
    data: memberCoordination,
    isLoading: isLoadingCoordination,
    isError: isErrorCoordination,
  } = useQuery('memberCoordination', fetchMemberCoordination);

  const {
    data: item,
    isLoading: isLoadingItem,
    isError: isErrorItem,
  } = useQuery(
    ['memberCoordinationItem', selectedCoordinationId],
    () => fetchMemberCoordinationItem(selectedCoordinationId),
    {
      enabled: !!selectedCoordinationId,
    },
  );

  if (isLoadingCoordination) {
    return <Spinner />;
  }

  if (isErrorCoordination) {
    return <div>코디 조회 중 오류가 발생했습니다.</div>;
  }

  return (
    <Layout>
      <CoordinationLayout>
        {memberCoordination.length ? (
          memberCoordination.map((coordination) => (
            <Coordination
              key={coordination.coordinationId}
              coordination={coordination}
              onClick={setSelectedCoordinationId}
              isSelected={coordination.coordinationId === selectedCoordinationId}
            />
          ))
        ) : (
          <Text theme="content">코디가 없습니다.</Text>
        )}
      </CoordinationLayout>
      <CustomBreadCrumb>
        <CustomBreadCrumbTitle>착용한 상품</CustomBreadCrumbTitle>
        <CustomBreadCrumbLine />
      </CustomBreadCrumb>
      <ItemLayout>
        {isLoadingItem ? (
          <Spinner />
        ) : isErrorItem ? (
          <Text theme="content">아이템 조회 중 오류가 발생했습니다.</Text>
        ) : item && item.length ? (
          item.map((item) => <Item key={item.itemId} item={item} />)
        ) : (
          <Text theme="content">아이템이 없습니다.</Text>
        )}
      </ItemLayout>
    </Layout>
  );
};

export default Menu2;
