// src/actions/index.ts
import axios from 'axios';
import {AppDispatch} from '../store';
import {setNews, setError, startLoading} from '../reducers/newsReducer';
import {COCKPIT_API_URL, COCKPIT_TOKEN, COCKPIT_BASE_URL} from '@env';
import {NewsPost} from '../types/NewsPost';
import {mapCockpitToNewsItem} from '../utils/mapCockputToNewsItem';

export const loadTopNews = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const res = await axios.post(
      COCKPIT_API_URL,
      {
        sort: {_created: -1},
        limit: 10,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cockpit-Token': COCKPIT_TOKEN,
        },
      },
    );

    const rawEntries: NewsPost[] = res.data.entries;

    console.log('Fetched top news:', rawEntries);

    const parsedEntries = rawEntries.map(entry =>
      mapCockpitToNewsItem(entry, COCKPIT_BASE_URL),
    );

    dispatch(setNews(parsedEntries));
  } catch (error) {
    console.error('Error fetching top news:', error);
    dispatch(setError('Failed to load news.'));
  }
};
