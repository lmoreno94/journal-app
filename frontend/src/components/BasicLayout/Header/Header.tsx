import { Menu, PlusCircle, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch } from '../../../hooks/useDispatchSelector';
import { setNewNote } from '../../../redux/features/Notes';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.mode === 'dark' ? '#1f2937' : '#ffffff'};
  border-bottom: 1px solid ${props => props.theme.mode === 'dark' ? '#374151' : '#e5e7eb'};
  padding: 0.75rem 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  
  @media (min-width: 1024px) {
    display: none;
  }
  
  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#f3f4f6'};
  }
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.mode === 'dark' ? '#f9fafb' : '#1f2937'};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#4b5563' : '#d1d5db'};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#ffffff'};
  color: ${props => props.theme.mode === 'dark' ? '#f9fafb' : '#111827'};

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const NewNoteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  transition: background-color 0.2s;
`;

export default function Header(){
  const navegate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNewNote = () => {
    navegate('/mis_notas/nueva_nota')
    dispatch(setNewNote());
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <MenuButton>
            <Menu size={20} />
          </MenuButton>
          <Title>Dashboard</Title>
        </LeftSection>
        
        <RightSection>
          <SearchContainer>
            <SearchIcon size={16} />
            <SearchInput
              type="text"
              placeholder="Buscar notas..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <NewNoteButton onClick={() => handleNewNote()}>
            <PlusCircle size={16} />
            <span>Nueva Nota</span>
          </NewNoteButton>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  )
}
