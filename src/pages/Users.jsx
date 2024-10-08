import useFetch from '../hooks/useFetch';
import UserEditModal from '../components/fragmentes/UserEditModal';
import Button from '../components/elements/Button';
import { useState } from 'react';
import useUpdate from '../hooks/useUpdate';
import Table from '../components/elements/Table';

const User = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/all-user');
  const [showModal, setShowModal] = useState(false);
  const [nameUpd, setNameUpd] = useState('');
  const [roleUpd, setRoleUpd] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { updateItem } = useUpdate('api/v1/update-user-role');

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

      {/* <table className="w-3/4 text-center border-2 border-black table-auto">
        <thead>
          <tr>
            <th className="border-2 border-black">Name</th>
            <th className="border-2 border-black">Email</th>
            <th className="border-2 border-black">Role</th>
            <th className="border-2 border-black">Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table> */}

      <Table
        logic={data?.data?.map((user) => (
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

      {/* <div className="flex flex-col items-center gap-4 w-[90%]">
        <div className="grid w-full grid-cols-4 gap-4">
          {data?.data?.map((user) => (
            <div
              key={user.id}
              className="flex flex-col items-center border-2 border-black gap-2 p-2 w-[18.5rem] h-[18.5rem]"
            >
              <img
                src={user.profilePictureUrl}
                alt={user.name}
                className="w-1/3 rounded-full h-1/3"
              />
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
              <p>Role: {user.role}</p>

              <Button
                text="Edit Role"
                event={() => {
                  setShowModal(true);
                  setNameUpd(user.name);
                  setRoleUpd(user.role);
                  setUpdateId(user.id);
                }}
              />
            </div>
          ))}
        </div>
      </div> */}

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
    </div>
  );
};

export default User;
