import {useState} from 'react';

const useRefresh = (refresh: () => Promise<unknown>) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  async function onRefresh() {
    setIsRefreshing(true);
    try {
      await refresh();
    } catch (err) {
      console.error('Error in useRefresh hook', err);
    } finally {
      setIsRefreshing(false);
    }
  }

  return {isRefreshing, onRefresh};
};

export default useRefresh;

/*

Best use in ScrollView or Flatlist for pull to refresh functionality

const { isRefreshing, onRefresh } = useRefresh(fetchApi);

*/
