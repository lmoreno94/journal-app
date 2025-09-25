import { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface DashboardLayoutProps {
    children: ReactNode;
}

const Layout = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.background};
`;

interface SidebarContainerProps {
    $isCollapsed: boolean;
}

const SidebarContainer = styled.div<SidebarContainerProps>`
    width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '240px')};
    background-color: ${({ theme }) => theme.cardBackground};
    border-right: 1px solid ${({ theme }) => theme.borderColor};
    transition: width 0.3s ease;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
`;

const ToggleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.textPrimary};
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 1rem;

    &:hover {
        background-color: ${({ theme }) => theme.textPrimary};
        color: ${({ theme }) => theme.cardBackground};
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

const Logo = styled.div<SidebarContainerProps>`
    margin-bottom: 2rem;
    font-size: ${({ $isCollapsed }) => ($isCollapsed ? '1rem' : '1.5rem')};
    font-weight: bold;
    color: ${({ theme }) => theme.textPrimary};
    text-align: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'left')};
`;

const MenuItem = styled.div<SidebarContainerProps>`
    display: flex;
    align-items: center;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.textSecondary};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.borderColor};
        color: ${({ theme }) => theme.textPrimary};
    }

    svg {
        width: 20px;
        height: 20px;
        margin-right: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0.75rem')};
    }

    span {
        display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'block')};
    }
`;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Layout>
            <SidebarContainer $isCollapsed={isCollapsed}>
                <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                        </svg>
                    )}
                </ToggleButton>

                <Logo $isCollapsed={isCollapsed}>
                    {isCollapsed ? 'J' : 'Journal'}
                </Logo>

                <nav>
                    <MenuItem $isCollapsed={isCollapsed}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Inicio</span>
                    </MenuItem>
                    <MenuItem $isCollapsed={isCollapsed}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>Notas</span>
                    </MenuItem>
                    <MenuItem $isCollapsed={isCollapsed}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span>Favoritos</span>
                    </MenuItem>
                    <MenuItem $isCollapsed={isCollapsed}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span>Configuración</span>
                    </MenuItem>
                </nav>
            </SidebarContainer>
            <MainContent>
                {children}
            </MainContent>
        </Layout>
    );
}