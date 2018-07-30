import React, { Fragment } from 'react';
// import defaultProfileImage from '../../../assets/images/background.jpg';
import defaultProfileImage from '../../../assets/images/person.png';
import { Card, CardTitle, CardText, CardImg } from 'reactstrap';

const LeftSidebar = (props) => {
  return (
    <Fragment>
      <Card body outline color="secondary" className="text-center" style={{ background: "rgb(230,230,230)", marginBottom: "14px" }}>
        <CardImg
          width="100%"
          height="150"
          style={{ borderRadius: "10%" }}
          src={props.profileImage || defaultProfileImage}
          alt="Hello World"
        />
        <CardTitle style={{ marginTop: "15px" }}>
          {props.displayName}
        </CardTitle>
        <CardText>
          <small>
            {props.status}
          </small>
        </CardText>
      </Card>
      <Card body outline color="secondary" style={{ background: "rgb(230,230,230)" }}>
        <CardText>
          <div>My Posts</div>
          <div>Account Settings</div>
        </CardText>
      </Card>
    </Fragment>
  )
}

export default LeftSidebar
