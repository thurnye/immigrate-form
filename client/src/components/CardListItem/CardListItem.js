import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './CardListItem.module.css';
import { getDateShort } from '../../utils/helperFunc';

export default function CardListItem({formItem}) {
  const {_id, formName, createdAt} = formItem

  return (
    <Card sx={{width: '100%' }} className={styles.CardListItem}>
      <CardContent>
        <Typography variant="h5" component="div">
        {formName}
        </Typography>
        <Typography variant="body2">
          {getDateShort(createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
