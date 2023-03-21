import * as React from "react";
import Card from "../../components/Card/Card";
import styles from "./Profiles.module.css";
import FormModal from "../../components/Modal/FormModal";
import { useMutation } from "@apollo/client";
import { DELETE_PROFILE, EDIT_PROFILE } from "../../network/queries";
import RemoveProfileModal from "../../components/Modal/RemoveProfileModal";
import { toast } from "react-toastify";

export const Profiles = React.forwardRef(({ profileData, onScroll }, ref) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [editFormInputs, setEditFormInputs] = React.useState(null);
  const [openRemoveProfileModal, setOpenRemoveProfileModal] =
    React.useState(false);
  const [deleteProfileData, setDeleteProfileData] = React.useState(null);
  const [updateProfile] = useMutation(EDIT_PROFILE);
  const [deleteProfile] = useMutation(DELETE_PROFILE);

  const editProfile = (inputData) => {
    setEditFormInputs({...inputData});
  };

  React.useEffect(() => {
    if (editFormInputs !== null) {
      setOpenModal(true);
    }
  }, [editFormInputs]);

  const notifyDelete = () =>
  toast.info('Profile deleted. Refresh page to see latest data!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const removeProfile = () => {
    deleteProfile({ variables: { deleteProfileId: deleteProfileData?.id }, onCompleted: notifyDelete });
    setDeleteProfileData(null);
    setOpenRemoveProfileModal(false);
  };

  const onSubmit = (formData) => {
    updateProfile({ variables: { ...formData } });
    setOpenModal(false);
  };

  const handleRemoveProfile = (profileData) => {
    setDeleteProfileData(profileData);
    setOpenRemoveProfileModal(true);
  };

  const actions = [
    {
      label: "Edit profile",
      handleAction: editProfile,
    },
    {
      label: "Remove profile",
      handleAction: handleRemoveProfile,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <FormModal
          title="Edit Profile"
          open={openModal}
          onCloseModal={() => setOpenModal(false)}
          onSubmit={onSubmit}
          formInputs={editFormInputs}
          btnLabel="Edit Profile"
        />
        <RemoveProfileModal
          openModal={openRemoveProfileModal}
          handleClose={() => setOpenRemoveProfileModal(false)}
          handleSubmit={removeProfile}
        />
        {
          profileData.length > 0 &&
          profileData.map((profile, index) => {
            return (
              <>
                <Card
                  key={profile?.id || index}
                  avatarUri={profile?.first_name.charAt(0).toUpperCase()}
                  title={`${profile?.first_name} ${profile?.last_name}`}
                  subTitle={profile?.email}
                  description={profile?.description}
                  isVerified={profile?.is_verified}
                  actions={actions}
                  profileData={profile}
                />
              </>
            );
          })}
      </div>
    </>
  );
});

export default Profiles;
