import {Box, Card, CardContent, Chip, Grid, Typography} from '@mui/material';
import {formatShortDate} from '@/utils/dateUtils';

const statusColors = {
    OPEN: 'warning',
    RESPONDED: 'info',
    CLOSED: 'success'
};

const DemandList = ({demands, categories, statuses, onDemandClick}) => {
    return (
        <Grid container spacing={3}>
            {demands.map((demand) => (
                <Grid item xs={12} mb={6} key={demand.id}>
                    <Card
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {boxShadow: 6}
                        }}
                        onClick={() => onDemandClick(demand)}
                    >
                        <CardContent>
                            <Box sx={{
                                width: '400px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2
                            }}>
                                {console.log(demand.status)}
                                <Typography variant="h6">{demand.title}</Typography>
                                <Chip
                                    sx={{borderRadius: '25px', height: '15px', width: '60px', padding: '2px'}}
                                    label={statuses.find(s => s.key === demand.status)?.desc}
                                    color={statusColors[demand.status]}
                                    size="small"
                                />
                            </Box>
                            <Typography color="text.secondary" sx={{mb: 2}}>
                                {demand.description}
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="caption" color="text.secondary">
                                    Kategori: {categories.find(c => c.key === demand.category)?.desc}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {formatShortDate(demand.createdDate)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default DemandList; 