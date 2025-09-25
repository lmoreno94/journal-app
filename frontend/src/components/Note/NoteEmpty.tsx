import { FileText, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    text-align: center;
    padding: 3rem 0;
`;

const Icon = styled(FileText)`
    margin: 0 auto;
    height: 3rem;
    width: 3rem;
    color: #9ca3af;
    margin-bottom: 1rem;
`;

const Title = styled.h3`
    font-size: 1.125rem;
    font-weight: 500;
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1f2937'};
    margin-bottom: 0.5rem;
`;

const Description = styled.p`
    color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#4b5563'};
    margin-bottom: 1rem;
`;

const CreateButton = styled.button`
    display: inline-flex;
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

export default function NoteEmpty() {
    const navigate = useNavigate();

    return (
        <Container>
            <Icon />
            <Title>
                No hay notas
            </Title>
            <Description>
                Comienza creando tu primera nota
            </Description>
            <CreateButton onClick={() => navigate("/new-note")}>
                <PlusCircle size={16} />
                <span>Crear Nota</span>
            </CreateButton>
        </Container>
    )
}
