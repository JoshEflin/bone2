import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Row, Col, Button, Card } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import styles from "./ProfilePage.module.css";
import DoggyDash from "../components/cards/DoggyDash";
import { Divider } from "antd";
import ProfileCard from "../components/cards/ProfileCard";
export default function Profile(props) {
  const { setDogCardData, dogCardData } = props;
  console.log(setDogCardData);
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log(_id);
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: {
      id: _id,
    },
  });
  const userData = dataUser?.user;
  console.log("User Data", userData);
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch,
  } = useQuery(GET_ME);
  const meData = dataMe?.me;
  console.log("MeData", meData);
  const profileCards = { profileCards: meData?.dogCards };
  
  if (!userData) {
    return <div>Loading...</div>; // return a loading state if userData is falsy
  }
  if (meData && userData && meData._id === userData._id) {
    //  profileCards = { profileCards:meData.dogCards}
    return (
      <Row className={styles.profileRow}>
        <Col className={styles.profileCol} span={6}>
          PROFILE
          <ProfileCard props={meData} />
        </Col>
        <Col className={styles.doggyDash} span={18}>
          <DoggyDash
            setDogCardData={setDogCardData}
            dogCardData={profileCards}
          />
        </Col>
      </Row>
    );
  } else if (userData && meData && meData._id != userData._id) {
    console.log(userData.dogCards)
    const userCardData={profileCards: userData.dogCards}
    console.log(userCardData);
    return (
      <>
        <Row>
          <Col span={6}>
            <ProfileCard props={userData} />
          </Col>
          <Col>
            <DoggyDash
              setDogCardData={setDogCardData}
              dogCardData={userCardData}
            />
          </Col>
        </Row>
      </>
    );
  }
}
