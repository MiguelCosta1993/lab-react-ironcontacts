import React from 'react';
import Contacts from '../contacts.json';
import './ContactsList.css';

const SingleContact = (props) => {
  const { name, popularity, picture } = props;
  return (
    <>
      <td>
        <img src={picture} alt={name} />
      </td>
      <td>{name}</td>
      <td>{popularity.toString()}</td>
    </>
  );
};
class ContactsList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [...Contacts.slice(0, 5)],
      displayContactsIndex: [],
    };
    this.fullList = [...Contacts];
  }
  newEl = () => {
    let result = Math.floor(Math.random() * this.fullList.length - 1);
    if (this.state.displayContactsIndex.includes(result)) {
      console.log('same');
      this.newEl();
    } else {
      console.log('new');
      this.setState({
        displayContactsIndex: [...this.state.displayContactsIndex, result],
      });
      return result;
    }
  };
  addName = () => {
    const newEl = this.newEl();
    console.log('add');
    const contacts = [...this.state.contacts, Contacts[newEl]];
    this.setState({
      contacts: contacts,
    });
  };

  sortByName = () => {
    const contacts = [...this.state.contacts];
    contacts.sort((a, b) => {
      return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
    });
    this.setState({
      contacts: contacts,
    });
    console.log(contacts);
  };
  sortByPopularity = () => {
    const contacts = [...this.state.contacts];
    contacts.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    this.setState({
      contacts: contacts,
    });
    console.log(contacts);
  };

  delete = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((item) => item.id !== id),
    });
  };

  render() {
    const contacts = this.state.contacts;
    return (
      <div>
        <span>
          <button onClick={this.addName}>Add a name</button>
          <button onClick={this.sortByName}>Sort by Name</button>
          <button onClick={this.sortByPopularity}>Sort by Popularity</button>
        </span>
        <table>
          <thead>
            <tr>
              <th>
                <h1>IronContacts</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h3>Picture</h3>
              </td>
              <td>
                <h3>Name</h3>
              </td>
              <td>
                <h3>Popularity</h3>
              </td>
            </tr>
            {contacts.map((person) => {
              return (
                <tr>
                  <SingleContact
                    key={person.id}
                    name={person.name}
                    popularity={person.popularity.toFixed(2)}
                    picture={person.pictureUrl}
                  />
                  <td>
                    <button onClick={() => this.delete(person.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ContactsList;
