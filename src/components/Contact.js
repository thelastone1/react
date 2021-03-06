import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';

export default class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedKey:-1,
      keyword:'',
      contactData:[
        {name : 'Apple', phone : '010-0000-0000'},
        {name : 'Bear', phone : '010-0000-0001'},
        {name : 'Charlie', phone : '010-0000-0002'},
        {name : 'Dave', phone : '010-0000-0003'},
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount(){
    const contactData = localStorage.contactData; // localStorage에서 contactData를 불러온다

    if (contactData) {
      this.setState({
        contactData:JSON.parse(contactData)
      });
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
        localStorage.contactData = JSON.stringify(this.state.contactData);
    }    //contactData가 지금과 이전값이 다르다면 지금값을 저장
  }

  handleChange(e){ //value값 변경
    this.setState({
      keyword: e.target.value
    });
  }
  handleClick(key){ //클릭했을 때, 선택되는 내용 보여줌
    this.setState({
      selectedKey : key
    });
    console.log(key, 'is selected');
  }
  handleCreate(contact){
    this.setState({
      contactData: update(this.state.contactData, {$push : [contact]})
    });
  }
  handleRemove(){ //parameter를 갖지 않음, selectedKey를 삭제할때 사용
    if (this.state.selectedKey < 0) {
      return;
    }
    this.setState({
      contactData : update(this.state.contactData,{$splice : [[this.state.selectedKey,1]]}),
      selectedKey : -1 //selectedKey를 무효화 한다.
    });
  }
  handleEdit(name,phone){
    this.setState({
      contactData: update(this.state.contactData,
      {
        [this.state.selectedKey]:{
          name:{$set : name},
          phone:{$set : phone}
        }
      })
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
        return(<ContactInfo
                contact={contact}
                key={i}
                onClick={() => this.handleClick(i)}/>);
      });
    };

    return(
      <div>
        <h1>Contacts</h1>
        <input
          name = "keyword"
          placeholder = "Search"
          value = {this.state.keyword}
          onChange = {this.handleChange}
        />
        <div>{mapToComponent(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact = {this.state.contactData[this.state.selectedKey]}
          onRemove = {this.handleRemove}
          onEdit = {this.handleEdit}
        />
        <ContactCreate
          onCreate = {this.handleCreate}
        />
      </div>
    );
  }
}
