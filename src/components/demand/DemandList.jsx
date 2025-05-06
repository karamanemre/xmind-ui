import {Box, Card, CardContent, Chip, Grid, Typography} from '@mui/material';
import {formatShortDate} from '@/utils/dateUtils';
import {useTranslation} from 'react-i18next';

const statusColors = {
    OPEN: 'warning',
    RESPONDED: 'info',
    CLOSED: 'success'
};

const DemandList = ({demands, categories, statuses, onDemandClick}) => {
    const {t} = useTranslation();

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
                                    label={t(`demand.status${demand.status}`)}
                                    color={statusColors[demand.status]}
                                    size="small"
                                />
                            </Box>
                            <Typography color="text.secondary" sx={{mb: 2}}>
                                {demand.description}
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="caption" color="text.secondary">
                                    {t('demand.category')}: {categories.find(c => c.key === demand.category)?.desc}
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