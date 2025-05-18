import axios from 'axios';
import { AppDispatch } from '../store';
import { setNews, setError, startLoading } from '../reducers/newsReducer';

// todokeys to add.

export const loadAllNews = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const res = await axios.post(
      API_URL,
      {
        sort: { _created: -1 },
        limit: 10, // 👈 Fetch ALL entries (0 means no limit in Cockpit)
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cockpit-Token': API_TOKEN,
        },
      }
    );

    dispatch(setNews(res.data.entries));
  } catch (error) {
    console.error('Error fetching all news:', error);
    dispatch(setError('Failed to load news.'));
  }
};


export const loadLastMonthNews = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const oneMonthAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

  try {
    const res = await axios.post(API_URL, {
      filter: { _created: { $gte: oneMonthAgo } },
      sort: { _created: -1 },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cockpit-Token': API_TOKEN,
      },
    });

    dispatch(setNews(res.data.entries));
  } catch (error) {
    console.error('Error fetching last month news:', error);
    dispatch(setError('Failed to load news.'));
  }
};

export const loadLastWeekNews = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

  try {
    const res = await axios.post(API_URL, {
      filter: { _created: { $gte: oneWeekAgo } },
      sort: { _created: -1 },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cockpit-Token': API_TOKEN,
      },
    });

    dispatch(setNews(res.data.entries));
  } catch (error) {
    console.error('Error fetching last week news:', error);
    dispatch(setError('Failed to load news.'));
  }
};
