import React from 'react';
import ContactInfo from './ContactInfo';

export default class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      keyword:'',
      contactData:[
        {name : 'Apple', phone : '010-0000-0000'},
        {name : 'Bear', phone : '010-0000-0001'},
        {name : 'Charlie', phone : '010-0000-0002'},
        {name : 'Dave', phone : '010-0000-0003'},
      ]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      keyword: e.target.value
    });
  }

  render(){
    const mapToComponent = (data) => {
      data.sort();
      data = data.filter(
        (contact) => {
          return contact.name.toLowerCase()
          .indexOf(this.state.keyword) > -1;
        });
      return data.map((contact,i)=>{
        return(<ContactInfo contact={contact} key={i} />);
      });
    };

    // 위 내용과 같음 - 이건 ES5 기준, 위에껀 ES6기준
    // var mapToComponent = function mapToComponent(data){
    //   return data.map(function(contact,i){
    //     return React.createElement(ContactInfo, {contact : contact, key : i});
    //   });
    // };

    return(
      <div>
        <h1>Contacts</h1>
        <input
          name = "keyword"
          placeholder = "Search"
          value = {this.state.keyword}
          onChange={this.handleChange}
        />
        {mapToComponent(this.state.contactData)}
      </div>
    );
  }
}
