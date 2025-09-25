import {
	useAppSelector,
	useAppDispatch,
} from "../../../hooks/useDispatchSelector";
import { setShow } from "../../../redux/features/Sidebar";
import { X, type LucideProps } from "lucide-react";
import * as Icons from "lucide-react";
import { Link, useNavigation } from "react-router-dom";
import styled from 'styled-components';

type LucideCmp = React.ComponentType<LucideProps>;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: 16rem;
  background-color: ${props => props.theme.mode === 'dark' ? '#1f2937' : '#ffffff'};
  border-right: 1px solid ${props => props.theme.mode === 'dark' ? '#374151' : '#e5e7eb'};
  transform: translateX(${props => props.$show ? '0' : '-100%'});
  transition: transform 300ms ease-in-out;
  
  @media (min-width: 1024px) {
    position: static;
    transform: none;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.mode === 'dark' ? '#374151' : '#e5e7eb'};
`;

const SidebarTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.mode === 'dark' ? '#f9fafb' : '#1f2937'};
`;

const CloseButton = styled.button`
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  @media (min-width: 1024px) {
    display: none;
  }
  
  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#f3f4f6'};
  }
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 1rem;
`;

const MenuSection = styled.div`
  margin-bottom: 0.5rem;
`;

const MenuItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  width: 100%;
  text-align: left;
  color: ${props => props.$active ? '#2563eb' : props.theme.mode === 'dark' ? '#d1d5db' : '#4b5563'};
  background-color: ${props => props.$active ? '#dbeafe' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#f3f4f6'};
  }
`;

const CategoriesSection = styled.div`
  margin-top: 2rem;
`;

const CategoriesTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.mode === 'dark' ? '#9ca3af' : '#6b7280'};
  margin-bottom: 0.75rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  text-align: left;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#f3f4f6'};
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorDot = styled.div<{ $bgColor: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.$bgColor};
  flex-shrink: 0;
`;

const CategoryLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#4b5563'};
`;

const CategoryCount = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideProps) => {
	const Icon = (Icons as unknown as Record<string, LucideCmp>)[name];
	if (!Icon) {
		console.warn(`⚠️ Icon "${name}" no existe en lucide-react`);
		return <Icons.HelpCircle {...props} />;
	}
	return <Icon {...props} />;
};

export default function Sidebar() {
	const { show, menu } = useAppSelector((state) => state.sidebarState );
	const { categories } = useAppSelector((state) => state.categorieState );
	const { notes } = useAppSelector((state) => state.noteState );

	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const currentPath = navigation.location
		? navigation.location.pathname
		: window.location.pathname;

	const handleShowSidebar = () => {
		dispatch(setShow());
	};

	return (
		<>
			{show && (
				<Overlay onClick={() => handleShowSidebar()} />
			)}

			<SidebarContainer $show={show}>
				<SidebarContent>
					<SidebarHeader>
						<SidebarTitle>Mis Notas</SidebarTitle>
						<CloseButton onClick={() => handleShowSidebar()}>
							<X size={20} />
						</CloseButton>
					</SidebarHeader>

					<Navigation>
						<MenuSection>
							{menu.map((item) => (
								<MenuItem
									key={item.path}
									to={item.path}
									$active={currentPath === item.path}
								>
									<DynamicIcon name={item.icon} size={18} />
									<span>{item.label}</span>
								</MenuItem>
							))}
						</MenuSection>

						<CategoriesSection>
							<CategoriesTitle>
								Categorías
							</CategoriesTitle>
							<CategoryList>
								{categories.map((category) => {
									const categoryNotes = notes.filter(
										(note) => note.category === category.value
									);
									return (
										<CategoryItem
											key={category.value}
											to={category.value}
										>
											<CategoryInfo>
												<ColorDot $bgColor={category.bgColor} />
												<CategoryLabel>
													{category.label}
												</CategoryLabel>
											</CategoryInfo>
											<CategoryCount>
												{categoryNotes.length}
											</CategoryCount>
										</CategoryItem>
									);
								})}
							</CategoryList>
						</CategoriesSection>
					</Navigation>
				</SidebarContent>
			</SidebarContainer>
		</>
	);
}
