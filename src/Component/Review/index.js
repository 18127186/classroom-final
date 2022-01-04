import React, { useState, useEffect } from "react";
import {  Navbar, Card } from 'react-bootstrap';
import { NavLink, useParams, Link } from "react-router-dom";
import './index.css'

const DetailReview = () => {
    const params = useParams();
    const listAssignmentURL = '/classes/detail/' + params.idClass + "/assignment";
    const detailURL = '/classes/detail/' + params.idClass;
    const memberURL = '/classes/members/' + params.idClass;
    const gradesStructure = '/grades/' + params.idClass;

    const [role, setRole] = useState();
    const [data, setData] = useState({
        id: null,
        assign_id: null,
        topic: null,
        student_id: null,
        current_grade: null,
        done: null,
        expect_grade: null,
        explanation: null
    });
    const [update_grade, setUpdateGrade] = useState();
    
    const getRole = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "classId": params.idClass
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL + "accounts/role/" + localStorage.getItem("userId"), requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result[0].role);
            setRole(result[0].role)

        })
        .catch(error => console.log('error', error));
    }

    const getData = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL + "reviews/detail/" + params.idClass + "/" + params.idReview, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result) {
                setData({
                    id: result[0].id,
                    assign_id: result[0].assign_id,
                    topic: result[0].topic,
                    student_id: result[0].student_id,
                    current_grade: result[0].current_grade,
                    done: result[0].done,
                    expect_grade: result[0].expect_grade,
                    explanation: result[0].explanation
                });
                setUpdateGrade(result[0].update_grade);
            }
        })
        .catch(error => {
            console.log('error', error);
        })
    }

    useEffect(() => {
        getRole();
        getData();   
    }, [params.id]);

    const updateGrade = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "update_grade": update_grade
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL + "reviews/update/" + params.idClass + "/" + params.idReview, requestOptions)
        .then(response => response.text())
        .then(result => {
            alert("Update grade successfully!")
        })
        .catch(error => {
            console.log('error', error)
            alert("Update fail!")
        });
    }

    const onChangeHandler = (e) => setUpdateGrade(e.target.value);

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
                <NavLink className="nav-link" to={listAssignmentURL}>
                    List Assignment
                </NavLink>
                <NavLink className="nav-link" to={gradesStructure} hidden={!(role === 'teacher')}>
                    Grades Structure
                </NavLink>
                <NavLink className="nav-link" to='#'>
                    Grade Reviews
                </NavLink>
                </Navbar.Collapse>
            </Navbar>
            <Card className="review mx-auto">
                <Card.Header as= "h2" className="head-center"> Grade Review {data.id} </Card.Header>
                <Card.Body>            
                    {/* <Card.Title> Abc </Card.Title> */}
                    <Card.Text> Grade composition: {data.topic} </Card.Text> 
                    <Card.Text> Student ID: {data.student_id} </Card.Text>
                    <Card.Text> Current grade: {data.current_grade} </Card.Text>
                    <Card.Text> Expect grade: {data.expect_grade} </Card.Text>
                    <Card.Text> Explanation: {data.explanation} </Card.Text>
                    {role === 'teacher' ? 
                    <Card.Text> Update grade: 
                        <input type="number"
                            defaultValue={update_grade}
                            onChange={onChangeHandler}>
                        </input> </Card.Text>
                    : 
                    <Card.Text> Update grade: {update_grade} </Card.Text>}
                    

                </Card.Body>
                <Card.Footer className="text-center">
                    <div className="footer-viewBtn text-center">
                        <button className="btn btn-success btnView" 
                        onClick={updateGrade}
                        hidden={!(role === 'teacher')}>
                        Confirm
                        </button>
                    </div>
                </Card.Footer>

            </Card>
            
        </div>
    )
}

export default DetailReview;