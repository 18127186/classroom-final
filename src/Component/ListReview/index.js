import React, { useState, useEffect } from "react";
import {  Navbar, Card } from 'react-bootstrap';
import { NavLink, useParams } from "react-router-dom";
import './index.css'

const ListReview = () => {
    const params = useParams();
    const detailURL = '/classes/detail/' + params.id;
    const memberURL = '/classes/members/' + params.id;
    const gradesStructure = '/grades/' + params.id;

    const [role, setRole] = useState();
    const [listReview, setListReview] = useState([]);
    
    const getRole = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "classId": params.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

        await fetch(process.env.REACT_APP_API_URL + "accounts/role/" + localStorage.getItem("userId"), requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result[0].role);
            setRole(result[0].role)

        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getRole();

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL + "reviews/" + params.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result) {
                setListReview(result);
            }
        })
        .catch(error => {
            console.log('error', error);
        })
    }, [params.id]);

    const RenderAReview = (id, student_id, assignment) => {
        return(
            <Card className="review mx-auto">
                <Card.Header as= "h2" className="head-center"> Grade Review {id} </Card.Header>
                <Card.Body>            
                    {/* <Card.Title> Abc </Card.Title> */}
                    <Card.Text> Grade composition: {assignment} </Card.Text> 
                    <Card.Text> Student ID: {student_id} </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                    <div className="footer-viewBtn text-center">
                        <button className="btn btn-danger btnView"
                                > View </button>
                    </div>
                </Card.Footer>

            </Card>
        )
    }


    return (
        <div>
            <Navbar bg="dark" variant="dark">
                    
                    {/* <button className="btn btn-success backbtn" onClick={this.props.backToList}> Back </button> */}
                <Navbar.Toggle /> 
                <Navbar.Collapse className="justify-content-end">
                <NavLink className="nav-link" to={detailURL} >
                    Detail
                </NavLink>
                <NavLink className="nav-link" to={memberURL}>
                    Member
                </NavLink>
                <NavLink className="nav-link" to='#'>
                    List Assignment
                </NavLink>
                <NavLink className="nav-link" to={gradesStructure} hidden={!(role === 'teacher')}>
                    Grades Structure
                </NavLink>
                </Navbar.Collapse>
            </Navbar>
            {listReview.map((row) => (
                RenderAReview(row.id, row.student_id, row.topic)
            ))}
            
        </div>
    )
}

export default ListReview;