import { useNavigate } from 'react-router-dom';
import LogoSVG from '@/assets/images/logo.svg?react';
import * as S from '@/components/Header/Header.styles';

const Header = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.LogoButton onClick={() => navigate('/')}>
        <LogoSVG />
      </S.LogoButton>
    </S.Container>
  );
};

export default Header;
