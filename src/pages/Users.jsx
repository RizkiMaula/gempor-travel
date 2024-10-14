import useFetch from '../hooks/useFetch';
import UserEditModal from '../components/fragmentes/UserEditModal';
import Button from '../components/elements/Button';
import { useEffect, useState } from 'react';
import useUpdate from '../hooks/useUpdate';
import Table from '../components/elements/Table';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const User = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/all-user');
  const [showModal, setShowModal] = useState(false);
  const [nameUpd, setNameUpd] = useState('');
  const [roleUpd, setRoleUpd] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { updateItem } = useUpdate('api/v1/update-user-role');

  // paginate
  const [page, setPage] = useState(0); // simpan halaman yang aktif (di gpt currentData)
  const [filterData, setFilterData] = useState(data?.data || []); // data akan ditampilkan setelah filter data untuk tiap halaman (di gpt data)
  const n = 5; // jumlah maksimal data yang akan ditampilkan ()

  useEffect(() => {
    setFilterData(data?.data?.slice(page, page + n));
  }, [data?.data]);

  useEffect(() => {
    console.log(page);
    setFilterData(data?.data?.slice(page, page + n));
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleRole = (e) => {
    setRoleUpd(e.target.value);
  };

  const handleUpdateRole = async () => {
    try {
      const dataWillUpdate = {
        role: roleUpd,
      };
      await updateItem(updateId, dataWillUpdate);
      alert('Role updated successfully');
      setShowModal(false);
      reFetch();
    } catch (error) {
      console.log(error);
      alert(`error: ${error}`);
    }
  };

  console.log(data);

  return (
    <div className="flex flex-col items-center gap-4 border-2 border-black">
      <h1>User</h1>

      <Table
        th2="Email"
        th3="Role"
        logic={(filterData || []).map((user) => (
          <tr
            key={user.id}
            className="text-center"
          >
            <td className="py-2 border-b-2">{user.name}</td>
            <td className="py-2 border-b-2">{user.email}</td>
            <td className="py-2 border-b-2">{user.role}</td>
            <td className="py-2 border-b-2">
              <Button
                text="Edit Role"
                event={() => {
                  console.log(`file ${user.name}: ${user.profilePictureUrl}`);
                  setShowModal(true);
                  setImageUrl(user.profilePictureUrl);
                  setNameUpd(user.name);
                  setRoleUpd(user.role);
                  setUpdateId(user.id);
                }}
              />
            </td>
          </tr>
        ))}
      />

      {showModal && (
        <UserEditModal
          text={'Edit Role'}
          value={roleUpd}
          name={nameUpd}
          onEventRole={handleRole}
          onUpdateRole={() => handleUpdateRole(updateId, roleUpd)}
          onClose={() => setShowModal(false)}
          image={imageUrl}
        />
      )}

      <ReactPaginate
        containerClassName="pagination"
        pageClassName="page-item"
        activeClassName="active"
        onPageChange={(event) => setPage((event.selected * n) % data?.data?.length || 0)} // event.selected adalah nilai halaman ke berapa (ke-n). event.selected dikali n untuk dapat mengambil data dari halaman ke berapa
        pageCount={Math.ceil((data?.data?.length || 0) / (n || 1))}
        breakLabel="..."
        previousLabel={
          <IconContext.Provider value={{ size: '1.5em', color: 'blue' }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ size: '1.5em', color: 'blue' }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
    </div>
  );
};

export default User;
