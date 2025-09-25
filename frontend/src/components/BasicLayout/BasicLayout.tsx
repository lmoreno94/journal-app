import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: ${props => props.theme.mode === 'dark' ? '#111827' : '#f9fafb'};
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const MainArea = styled.main`
    flex: 1;
    overflow-y: auto;
`;

export default function BasicLayout() {
	return (
		<Container>
			<Sidebar />
			<MainContent>
				<Header />
				<MainArea>
					<Outlet />
				</MainArea>
			</MainContent>
		</Container>
	);
}
