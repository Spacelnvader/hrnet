import React from 'react'
import { Link } from "react-router-dom";
import Header from "../components/header/header";
import { Form, Button, DatePicker, Input, Select, Space } from "antd";


/**
 * Display the Home page with the login form
 * @component
 * @returns {JSX.Element} Home component
 */

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Header>HRnet</Header>
                <div className="link_bloc">
                    <Link to="employee-list">View Current Employees</Link>
                </div>
                <Form
                    autoComplete="off"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={(values) => {
                        console.log({ values });
                    }}
                    onFinishFailed={(error) => {
                        console.log({ error });
                    }}
                >
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your first name",
                            },
                            { whitespace: true },
                            { min: 3 },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Type your first name" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your last name",
                            },
                            { whitespace: true },
                            { min: 3 },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Type your last name" />
                    </Form.Item>

                    <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[
                            {
                                required: true,
                                message: "Please provide your date of birth",
                            },
                        ]}
                        hasFeedback
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            picker="date"
                            placeholder="Chose date of birth"
                        />
                    </Form.Item>

                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[
                            {
                                required: true,
                                message: "Please provide the start date",
                            },
                        ]}
                        hasFeedback
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            picker="date"
                            placeholder="Chose date"
                        />
                    </Form.Item>



                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button block type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </header>
        </div>
    );
}

export default Home