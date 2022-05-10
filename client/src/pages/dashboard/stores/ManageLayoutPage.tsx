import * as React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../../../components/LoadingScreen';

const ManageLayoutPage = () => {
  const { storeId } = useParams();
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const { isLoading, data } = useQuery(`/store/${storeId}/layout`, async () => {
    const res = await axios.get(`/store/${storeId}/layout`);

    return res.data.items;
  });

  if (isLoading) return <LoadingScreen />;

  console.log(data);
  return (
    <section className="layout">
      <header className="layout__header">
        <h2 className="layout__heading">Store Layout</h2>

        <button
          className="layout__edit"
          type="button"
          onClick={() => setEditMode(!editMode)}
        >
          Edit
        </button>
      </header>

      <div className="layout__container">container</div>
    </section>
  );
};
export default ManageLayoutPage;
