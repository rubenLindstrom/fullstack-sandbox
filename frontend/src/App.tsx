import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ToDoLists } from './todos/components/ToDoLists';

const MainAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Things to do
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  mainWrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
  },
  centerContentWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80rem',
    flexGrow: 1,
  },
});

const MainWrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainWrapperStyle}>
      <MainAppBar />
      <div className={classes.centerContentWrapper}>
        <div className={classes.contentWrapperStyle}>{children}</div>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <MainWrapper>
        <ToDoLists style={{ margin: '1rem' }} />
      </MainWrapper>
    );
  }
}

export default App;
