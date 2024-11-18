import React, {useEffect, useState} from 'react';
import styles from './Forms.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import CardListItem from '../../components/CardListItem/CardListItem'
import {getRandomInt} from '../../utils/helperFunc'
import services from '../../utils/services';
import Pagination from '@mui/material/Pagination';
import Link from '@mui/material/Link';

export default function Forms() {
  const [data, setData] = useState([])
  const [page, setPage] = React.useState(1);
  const [counts, setCounts] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const fetchForms = async (pageNumber) => {
    try {
        const allForms = await services.getFormList({currentPage: page});
        const {forms, count} = allForms.data
        console.log(forms, count)
        setData(forms)
        setCounts(count)
        
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
  fetchForms(page)
}, [page])

  return (
    <Box sx={{ flexGrow: 1, p: 3}} className={styles.Forms}>
      <Box sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
      <Link href="/formBuilder" underline="none">
        Create New Form
      </Link>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((formItem) => (
          <Grid key={getRandomInt()} size={{ xs: 2, sm: 4, md: 4 }}>
            <CardListItem formItem={formItem}/>
          </Grid>
        ))}
      </Grid>

      <Box>
      {counts > 1 && <Pagination count={counts} page={page} onChange={handleChange} />}
      </Box>


    </Box>
  );
}
