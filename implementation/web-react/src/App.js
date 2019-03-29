import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
        first_name: '',
        note: '',
        phone: '',
        last_name: '',
      },
      editing: false,
      users: [],
    };

    this.onUserCreate = this.onUserCreate.bind(this);
    this.onUserEditClick = this.onUserEditClick.bind(this);
    this.onUserUpdate = this.onUserUpdate.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('http://0.0.0.0:9292/api/v1/users/')
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          users: data.users,
        });
      })
      .catch((err) => {
        console.log('err')
      })
  }

  handleChange(e) {
    const data = {...this.state.data};
    data[e.target.name] = e.target.value;

    this.setState({ data });
  }

  onEditCancel(e) {
    e.preventDefault();
    this.setState({
      editing: false,
      data: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        note: '',
      },
    });
  }

  onUserCreate(e) {
    const { data } = this.state;
    e.preventDefault();

    fetch('http://0.0.0.0:9292/api/v1/users/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'text/plain'
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let users = [...this.state.users];
        users.push(res);
        this.setState({
          users,
          data: {
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            note: '',
          }
        });
      })
  }

  onUserUpdate(e) {
    e.preventDefault();

    const {
      data,
    } = this.state;

    const formData = {...data};

    fetch(`http://0.0.0.0:9292/api/v1/users/${data.id}/`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'text/plain'
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let newUsers = [...this.state.users];
        this.setState({
          editing: false,
          data: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            note: '',
          },
          users: newUsers.map(u => (u.id === data.id ? res : u)),
        });
      })
  }

  onUserEditClick(e, id) {
    e.preventDefault();

    fetch(`http://0.0.0.0:9292/api/v1/users/${id}/`)
      .then((res) => res.json())
      .then((res) => {
        const data = res;
        this.setState({ data });
      })

    this.setState({
      editing: true,
    });
  }

  render() {
    const {
      data,
      editing,
      users,
    } = this.state;

    const {
      email,
      first_name,
      note,
      phone,
      last_name,
    } = data;

    return (
      <div className="App">
        { users.length === 0 ? <p>No users yet!</p> : null }
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((u) => {
                return (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.phone}</td>
                    <td>{u.note}</td>
                    <td><button onClick={e => this.onUserEditClick(e, u.id)}>Edit</button></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <hr />
        <h2>{editing ? 'Edit' : 'Add'} A User</h2>
        <form>
          <input type="text" required placeholder="First Name" onChange={this.handleChange} value={first_name} name="first_name" />
          <input type="text" required placeholder="Last Name" onChange={this.handleChange} value={last_name} name="last_name" />
          <input type="text" required placeholder="Email" onChange={this.handleChange} value={email} name="email" />
          <input type="text" required placeholder="Phone" onChange={this.handleChange} value={phone} name="phone" />
          <input type="text" required placeholder="Note" onChange={this.handleChange} value={note} name="note" />
          <input type="submit" value={editing ? 'Save' : 'Submit'} onClick={editing ? this.onUserUpdate : this.onUserCreate} />
          { editing ? <button onClick={this.onEditCancel}>Cancel</button> : null}
        </form>
      </div>
    );
  }
}

export default App;
