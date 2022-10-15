import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import ReactTooltip from 'react-tooltip';
import { Button, Form, InputGroup } from 'react-bootstrap';
import httpClient from '../../httpClient'
import { toast } from 'react-toastify';

const Profile = (props) => {
  const { user,loginWithPopup } = useAuth0();
  const { name, picture, email, email_verified, sub} = user;

  const [textInput, setTextInput] = React.useState('');

  const handleClick = () => {
    if(textInput.length > 0){
      updateUser({name:textInput})
    }
    else{
      toast.warn("you haven't provided a new value")
    }
  }

  const handleChange = (event) => {
    setTextInput(event.target.value);
  }

  const updateUser = (attrs)=>{
    const updatePromise = props.getToken()
    .then(token=>{
      return httpClient
      .authorized(token)
      .patch("/api/users",attrs,{
        'axios-retry': {
          retries: 0
        }
      })
      .then(()=>{
      })
    }) 
    toast.promise(
      updatePromise,
      {
        pending: 'Profile is updating...',
        success: {
          render({data}){
            loginWithPopup();
            return 'Profile is successfully updated 👌';
          }
        },
        error: {
          render({data}){
            const msg = data.response? data.response.data.message : 'something went wrong'
            return `Profile updating failed 🤯: ${msg}`
          }
        }
      }
    )
  }
  return (
    <div>
      <div className="row" style={{textAlign:"center"}}>
        <div >
          <img
            src={picture}
            alt="Profile"
            style={{width:"220px", height:"220px" ,maxWidth:"220px", maxHeight:"220px"}}
            // width={"200px"}
            // height={"200px"}
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
      </div>
      <div className='row'>
        <div className="col-md text-md-left">
          {/* <h2>{name}</h2> */}
          {/* <p className="lead text-muted">{email} </p> */}
          
          {/* <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
          /><br/> */}
          <Form.Label htmlFor="email">Email</Form.Label><br/>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{email_verified? <AiFillCheckCircle data-tip="email verified" color='green'/>:<AiFillCloseCircle data-tip="email not verified" color='grey'/>}</InputGroup.Text>
            <Form.Control
              id="email"
              disabled={true}
              value={email}
              readOnly={true}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            /><br/>
          </InputGroup>
          <Form.Label htmlFor="name">Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="name"
              defaultValue={name}
              disabled={!sub.startsWith("auth0|")}
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
            <Button id="button-addon1" onClick={handleClick}>
              Save
            </Button>
          </InputGroup>
        </div>
      </div>
      {/* <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          <p>That's what we know about you: </p>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div> */}
      <ReactTooltip/>
    </div>
  );
};

export default Profile;