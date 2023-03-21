import * as React from "react";
import styles from "./Dashboard.module.css";
import Container from "@mui/material/Container";
import Search from "../../components/Search/Search";
import Profiles from "../Profiles/Profiles";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FormModal from "../../components/Modal/FormModal";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROFILE, GET_PROFILES } from "../../network/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [dataLoading, setDataLoading] = React.useState(false);
  const [profilesError, setProfilesError] = React.useState(null);
  const [hasMoreData, setHasMoreData] = React.useState(true);
  const shouldPagination = React.useRef(true);
  const {loading, error, refetch } = useQuery(GET_PROFILES, {
    variables: { rows: 16, page: 0 },
  });
  const { refetch: searchRefetch } = useQuery(GET_PROFILES);

  const containerRef = React.useRef(null);
  const profileCountRef = React.useRef(0);
  React.useEffect(() => {
    setDataLoading(loading);
  }, [loading]);

  React.useEffect(() => {
    setProfilesError(error?.message);
  }, [error]);

  const [profileData, setProfileData] = React.useState([]);

  const [createProfile] = useMutation(CREATE_PROFILE);

  // This function will handle pagination based on page numbers.
  const handleNextPage = () => {
    if (shouldPagination.current && searchText === "") {
      (async () => {
        const { data: paginationData } = await refetch({
          page: profileCountRef.current,
          rows: 16,
        });
        setDataLoading(loading);
        setProfilesError(error?.message);
        profileCountRef.current += 1;
        if (paginationData?.getAllProfiles?.profiles?.length > 0) {
          setProfileData((data) => {
            return [...data, ...paginationData?.getAllProfiles?.profiles];
          });
        } else {
          hasMoreData(false);
        }
      })();
    }
  };

  const notifySucess = () =>
    toast.success("Profile Created. Refresh page to see latest data!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleCreateProfile = (data) => {
    createProfile({ variables: { ...data }, onCompleted: notifySucess });
    setOpenModal(false);
  };

  // This will handle search functionality and block pagination call while seaching, debounce added to reduce api calls.
  React.useEffect(() => {
    const getData = setTimeout(async () => {
      if (profileData && profileData.length > 0 && searchText !== "") {
        shouldPagination.current = false;
        setHasMoreData(false);
        const {
          data: searchData,
          loading,
          error,
        } = await searchRefetch({
          searchString: searchText !== "" ? searchText : "",
        });
        setDataLoading(loading);
        setProfilesError(error?.message);
        setProfileData(searchData?.getAllProfiles?.profiles);
      } else {
        shouldPagination.current = true;
        setHasMoreData(true);
        profileCountRef.current = 0;
        handleNextPage();
      }
    }, 500);

    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div ref={containerRef} className={styles.container}>
      <Container maxWidth="lg">
        <FormModal
          title="Create Profile"
          open={openModal}
          onCloseModal={() => setOpenModal(false)}
          onSubmit={handleCreateProfile}
          btnLabel="Create Profile"
        />
        <div className={styles.headerContainer}>
          <div className={styles.searchContainer}>
            <Search
              searchText={searchText}
              onChange={(value) => setSearchText(value)}
            />
          </div>
          <Button
            label="Create Profile"
            icon={<PersonAddAltIcon />}
            onHandleClick={() => setOpenModal(true)}
          />
        </div>
        {profileData && profileData.length > 0 && (
          <InfiniteScroll
            dataLength={profileData.length}
            next={handleNextPage}
            hasMore={hasMoreData}
            endMessage={<h4>Data is not availbale</h4>}
            loader={
              hasMoreData ? <h4>...Loading</h4> : <h4>Data is not availbale</h4>
            }
          >
            <Profiles profileData={profileData} />
          </InfiniteScroll>
        )}
        {!hasMoreData && <h4>Data is not availbale</h4>}
        {dataLoading && <Loader />}
        {profilesError && profilesError}
      </Container>
    </div>
  );
};

export default Dashboard;
