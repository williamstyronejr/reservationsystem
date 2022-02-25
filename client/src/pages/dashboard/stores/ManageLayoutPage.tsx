import * as React from 'react';

const ManageLayoutPage = () => {
  const [editMode, setEditMode] = React.useState<boolean>(false);

  return (
    <section className="layout">
      layout
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
