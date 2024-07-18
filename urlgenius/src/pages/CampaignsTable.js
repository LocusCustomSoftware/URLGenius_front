import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Checkbox,
    Modal,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TableSortLabel,
} from '@mui/material';
import './CampaignsTable.css';

const CampaignsTable = () => {
    // Mock de dados iniciais
    const initialUrls = [
        {
            id: 1,
            websiteUrl: 'https://www.example.com',
            source: 'Source 1',
            medium: 'Medium 1',
            campaign: 'Campaign 1',
            term: 'Term 1',
            content: 'Content 1',
            finalLinkingUrl: 'https://www.example.com/final',
            notes: 'Notes 1',
        },
        {
            id: 2,
            websiteUrl: 'https://www.test.com',
            source: 'Source 2',
            medium: 'Medium 2',
            campaign: 'Campaign 2',
            term: 'Term 2',
            content: 'Content 2',
            finalLinkingUrl: 'https://www.test.com/final',
            notes: 'Notes 2',
        },
        {
            id: 3,
            websiteUrl: 'https://www.demo.com',
            source: 'Source 3',
            medium: 'Medium 3',
            campaign: 'Campaign 3',
            term: 'Term 3',
            content: 'Content 3',
            finalLinkingUrl: 'https://www.demo.com/final',
            notes: 'Notes 3',
        },
    ];

    const [urls, setUrls] = useState(initialUrls);
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        websiteUrl: '',
        source: '',
        medium: '',
        campaign: '',
        term: '',
        content: '',
        finalLinkingUrl: '',
        notes: '',
    });

    const [filters, setFilters] = useState({
        websiteUrl: '',
        source: '',
        medium: '',
        campaign: '',
        term: '',
        content: '',
        finalLinkingUrl: '',
        notes: '',
    });

    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'ascending',
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUrls = [...urls].sort((a, b) => {
        const aValue = a[sortConfig.key] ? a[sortConfig.key].toLowerCase() : '';
        const bValue = b[sortConfig.key] ? b[sortConfig.key].toLowerCase() : '';
        
        if (sortConfig.direction === 'ascending') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    const toggleSelectUrl = (id) => {
        if (selectedUrls.includes(id)) {
            setSelectedUrls(selectedUrls.filter((urlId) => urlId !== id));
        } else {
            setSelectedUrls([...selectedUrls, id]);
        }
    };

    const deleteSelectedUrls = () => {
        const updatedUrls = urls.filter((url) => !selectedUrls.includes(url.id));
        setUrls(updatedUrls);
        setSelectedUrls([]);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleFilterModalOpen = () => {
        setFilterModalOpen(true);
    };

    const handleFilterModalClose = () => {
        setFilterModalOpen(false);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const newUrl = {
            id: urls.length + 1,
            websiteUrl: formData.websiteUrl,
            source: formData.source,
            medium: formData.medium,
            campaign: formData.campaign,
            term: formData.term,
            content: formData.content,
            finalLinkingUrl: formData.finalLinkingUrl,
            notes: formData.notes,
        };
        setUrls([...urls, newUrl]);
        setModalOpen(false);
        setFormData({
            websiteUrl: '',
            source: '',
            medium: '',
            campaign: '',
            term: '',
            content: '',
            finalLinkingUrl: '',
            notes: '',
        });
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredUrls = sortedUrls.filter((url) => {
        return (
            url.websiteUrl.toLowerCase().includes(filters.websiteUrl.toLowerCase()) &&
            url.source.toLowerCase().includes(filters.source.toLowerCase()) &&
            url.medium.toLowerCase().includes(filters.medium.toLowerCase()) &&
            url.campaign.toLowerCase().includes(filters.campaign.toLowerCase()) &&
            url.term.toLowerCase().includes(filters.term.toLowerCase()) &&
            url.content.toLowerCase().includes(filters.content.toLowerCase()) &&
            url.finalLinkingUrl.toLowerCase().includes(filters.finalLinkingUrl.toLowerCase()) &&
            url.notes.toLowerCase().includes(filters.notes.toLowerCase())
        );
    });

    return (
        <div className="campaigns-table-container">
            <div className="buttons-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFilterModalOpen}
                    className="filter-button"
                >
                    Filtros
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleModalOpen}
                    className="add-url-button"
                >
                    Adicionar URL
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteSelectedUrls}
                    disabled={selectedUrls.length === 0}
                    className="delete-urls-button"
                >
                    Excluir URLs Selecionadas
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'websiteUrl'}
                                    direction={sortConfig.key === 'websiteUrl' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('websiteUrl')}
                                >
                                    Website URL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'source'}
                                    direction={sortConfig.key === 'source' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('source')}
                                >
                                    Source
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'medium'}
                                    direction={sortConfig.key === 'medium' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('medium')}
                                >
                                    Medium
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'campaign'}
                                    direction={sortConfig.key === 'campaign' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('campaign')}
                                >
                                    Campaign
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'term'}
                                    direction={sortConfig.key === 'term' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('term')}
                                >
                                    Term
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'content'}
                                    direction={sortConfig.key === 'content' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('content')}
                                >
                                    Content
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'finalLinkingUrl'}
                                    direction={sortConfig.key === 'finalLinkingUrl' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('finalLinkingUrl')}
                                >
                                    Final Linking URL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'notes'}
                                    direction={sortConfig.key === 'notes' ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort('notes')}
                                >
                                    Notes
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUrls.map((url) => (
                            <TableRow key={url.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedUrls.includes(url.id)}
                                        onChange={() => toggleSelectUrl(url.id)}
                                    />
                                </TableCell>
                                <TableCell>{url.websiteUrl}</TableCell>
                                <TableCell>{url.source}</TableCell>
                                <TableCell>{url.medium}</TableCell>
                                <TableCell>{url.campaign}</TableCell>
                                <TableCell>{url.term}</TableCell>
                                <TableCell>{url.content}</TableCell>
                                <TableCell>{url.finalLinkingUrl}</TableCell>
                                <TableCell>{url.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Modal de Filtros */}
            <Modal
                open={filterModalOpen}
                onClose={handleFilterModalClose}
                aria-labelledby="filter-modal-title"
                aria-describedby="filter-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="filter-modal-title">Filtros</h2>
                    <form>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="websiteUrl-filter"
                            name="websiteUrl"
                            label="Website URL"
                            value={filters.websiteUrl}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="source-filter"
                            name="source"
                            label="Source"
                            value={filters.source}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="medium-filter"
                            name="medium"
                            label="Medium"
                            value={filters.medium}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="campaign-filter"
                            name="campaign"
                            label="Campaign"
                            value={filters.campaign}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="term-filter"
                            name="term"
                            label="Term"
                            value={filters.term}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="content-filter"
                            name="content"
                            label="Content"
                            value={filters.content}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="finalLinkingUrl-filter"
                            name="finalLinkingUrl"
                            label="Final Linking URL"
                            value={filters.finalLinkingUrl}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="notes-filter"
                            name="notes"
                            label="Notes"
                            value={filters.notes}
                            onChange={handleFilterChange}
                        />
                    </form>
                </Box>
            </Modal>
            {/* Modal de Adicionar URL */}
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="modal-title">Adicionar URL da Campanha</h2>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="websiteUrl"
                            name="websiteUrl"
                            label="Website URL"
                            value={formData.websiteUrl}
                            onChange={handleFormChange}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="source"
                            name="source"
                            label="Source"
                            value={formData.source}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="medium"
                            name="medium"
                            label="Medium"
                            value={formData.medium}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="campaign"
                            name="campaign"
                            label="Campaign"
                            value={formData.campaign}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="term"
                            name="term"
                            label="Term"
                            value={formData.term}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="content"
                            name="content"
                            label="Content"
                            value={formData.content}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="finalLinkingUrl"
                            name="finalLinkingUrl"
                            label="Final Linking URL"
                            value={formData.finalLinkingUrl}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="notes"
                            name="notes"
                            label="Notes"
                            value={formData.notes}
                            onChange={handleFormChange}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Adicionar
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default CampaignsTable;
