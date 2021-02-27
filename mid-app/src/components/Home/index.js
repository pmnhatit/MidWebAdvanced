import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import BoardList from "../BoardList";
import Header from "../Header";


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));


export default function Home() {
  const classes = useStyles();

  return (<>
  <Header/>
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <BoardList></BoardList>
          </Grid>
        </Container>
      </main>
      
    </React.Fragment>
    </>
  );
}