import { useAppSelector } from "../../hooks/useDispatchSelector";
import styled from 'styled-components';

const Container = styled.div`
    padding: 1.5rem;
    max-width: 56rem;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textPrimary};
    margin-bottom: 1.5rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Card = styled.div<{ $fullWidth?: boolean }>`
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    border: 1px solid ${({ theme }) => theme.borderColor};
    padding: 1.5rem;
    grid-column: ${({ $fullWidth }) => $fullWidth ? '1 / -1' : 'auto'};
`;

const CardTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.textPrimary};
    margin-bottom: 1rem;
`;

const StatsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const StatItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StatLabel = styled.span`
    color: ${({ theme }) => theme.textSecondary};
`;

const StatValue = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.textPrimary};
`;

const AppInfoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.textSecondary};
`;

const InfoItem = styled.p`
    &:before {
        content: '•';
        margin-right: 0.5rem;
    }
`;

export default function Setting() {

    const { notes } = useAppSelector((state) => state.noteState);
    const { categories } = useAppSelector((state) => state.categorieState);

    const stats = {
		total: notes.length,
		favorites: notes.filter((n) => n.isFavorite).length,
		archived: notes.filter((n) => n.isArchived).length,
		byCategory: categories.reduce<Record<string, number>>((acc, cat) => {
			acc[cat.value] = notes.filter((n) => n.category === cat.value).length;
			return acc;
		}, {}),
	};

	return (
        <Container>
            <Title>Configuración</Title>

            <Grid>
                <Card>
                    <CardTitle>Estadísticas</CardTitle>
                    <StatsList>
                        <StatItem>
                            <StatLabel>Total de notas:</StatLabel>
                            <StatValue>{stats.total}</StatValue>
                        </StatItem>
                        <StatItem>
                            <StatLabel>Favoritas:</StatLabel>
                            <StatValue>{stats.favorites}</StatValue>
                        </StatItem>
                        <StatItem>
                            <StatLabel>Archivadas:</StatLabel>
                            <StatValue>{stats.archived}</StatValue>
                        </StatItem>
                    </StatsList>
                </Card>

                <Card>
                    <CardTitle>Por Categoría</CardTitle>
                    <StatsList>
                        {categories.map((category) => (
                            <StatItem key={category.value}>
                                <StatLabel>{category.label}:</StatLabel>
                                <StatValue>{stats.byCategory[category.value] || 0}</StatValue>
                            </StatItem>
                        ))}
                    </StatsList>
                </Card>

                <Card $fullWidth>
                    <CardTitle>Información de la App</CardTitle>
                    <AppInfoList>
                        <InfoItem>Todas las notas se guardan localmente en tu navegador</InfoItem>
                        <InfoItem>Usa el buscador para encontrar notas rápidamente</InfoItem>
                        <InfoItem>Organiza tus notas por categorías personalizadas</InfoItem>
                        <InfoItem>Marca notas como favoritas o archívalas</InfoItem>
                        <InfoItem>La aplicación es completamente funcional offline</InfoItem>
                        <InfoItem>El tema oscuro se guarda automáticamente</InfoItem>
                        <InfoItem>Crea categorías personalizadas con colores únicos</InfoItem>
                    </AppInfoList>
                </Card>
            </Grid>
        </Container>
    );
}
