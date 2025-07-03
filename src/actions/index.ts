// src/actions/index.ts
import axios from 'axios';
import { AppDispatch } from '../store';
import { setNews, setError, startLoading } from '../reducers/newsReducer';
import Config from 'react-native-config';
import { NewsPost } from '../types/NewsPost';
import { mapCockpitToNewsItem } from '../utils/mapCockputToNewsItem';

export const loadTopNews = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const res = await axios.post(
      Config.COCKPIT_API_URL, // ✅ Config from react-native-config
      {
        sort: { _created: -1 },
        limit: 5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cockpit-Token': Config.COCKPIT_TOKEN, // ✅ Use proper key from .env
        },
      }
    );

    const rawEntries: NewsPost[] = res.data.entries;

    console.log('Fetched top news:', rawEntries);

    // ✅ Map and prepend full image path using Cockpit base URL
    const parsedEntries = rawEntries.map((entry) =>
      mapCockpitToNewsItem(entry, Config.COCKPIT_BASE_URL)
    );

    dispatch(setNews(parsedEntries));
  } catch (error) {
    console.error('Error fetching top news:', error);
    dispatch(setError('Failed to load news.'));
  }
};
