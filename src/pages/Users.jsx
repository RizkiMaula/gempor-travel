import useFetch from '../hooks/useFetch';
import UserEditModal from '../components/fragmentes/UserEditModal';
import Button from '../components/elements/Button';
import { useState } from 'react';
import usePost from '../hooks/usePost';

const User = () => {
  const { data, loading, error, reFetch } = useFetch('api/v1/all-user');
  const [showModal, setShowModal] = useState(false);
  const [roleUpd, setRoleUpd] = useState('');
  const [nameUpd, setNameUpd] = useState('');
  const { createItem: updateRole } = usePost('api/v1/update-user-role');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleRole = (e) => {
    setRoleUpd(e.target.value);
  };

  const handleName = (e) => {
    setNameUpd(e.target.value);
  };

  const handleUpdateRole = async (userId, currentRole) => {
    try {
      const updatedRole = currentRole === 'admin' ? 'user' : 'admin';
      await updateRole(userId, updatedRole);
      alert('Role updated successfully');
      reFetch();
    } catch (error) {
      console.log(error);
      alert(`error: ${error}`);
    }
  };

  return (
    <div>
      <h1>User</h1>
      <ul>
        {data?.data?.map((user, index) => (
          <li key={user.id}>
            {index + 1}. {user.name}{' '}
            <Button
              text={`Edit Role`}
              event={() => setShowModal(true)}
            />
          </li>
        ))}
      </ul>

      {showModal && (
        <UserEditModal
          text="Edit Role"
          role={handleRole}
          name={handleName}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default User;
