import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudentForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const [students, setStudents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = { name, age, email };

        try {
            if (isEditing) {
                await axios.put(`http://localhost:8080/api/students/update/${currentStudentId}`, newStudent);
                alert('Student updated successfully!');
                setIsEditing(false);
                setCurrentStudentId(null);
            } else {
                await axios.post('http://localhost:8080/api/students/add', newStudent);
                alert('Student added successfully!');
            }
            setName('');
            setAge(0);
            setEmail('');
            fetchStudents();
        } catch (error) {
            console.error('Error adding/updating student:', error);
            alert('Failed to add/update student. Please try again.');
        }
    };

    const handleEdit = (student) => {
        setName(student.name);
        setAge(student.age);
        setEmail(student.email);
        setIsEditing(true);
        setCurrentStudentId(student.id);
    };

    const handleDelete = async (studentId) => {
        try {
            await axios.delete(`http://localhost:8080/api/students/delete/${studentId}`);
            alert('Student deleted successfully!');
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Failed to delete student. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    style={styles.input}
                />
                <br />
                <label style={styles.label}>Age:</label>
                <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    required 
                    style={styles.input}
                />
                <br />
                <label style={styles.label}>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={styles.input}
                />
                <br />
                <button type="submit" style={styles.button}>
                    {isEditing ? 'Update' : 'Submit'}
                </button>
            </form>
            <button onClick={fetchStudents} style={{ ...styles.button, ...styles.viewButton }}>
                View Students
            </button>

            {students.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(student)} style={styles.editButton}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(student.id)} style={styles.deleteButton}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    label: {
        marginBottom: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    input: {
        marginBottom: '16px',
        padding: '8px',
        fontSize: '16px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ced4da',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
    },
    viewButton: {
        marginTop: '20px',
        backgroundColor: '#28a745',
    },
    table: {
        marginTop: '20px',
        width: '100%',
        borderCollapse: 'collapse',
    },
    editButton: {
        marginRight: '10px',
        padding: '5px 10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#ffc107',
        color: '#fff',
    },
    deleteButton: {
        padding: '5px 10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#dc3545',
        color: '#fff',
    }
};

export default AddStudentForm;
