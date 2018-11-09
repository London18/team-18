class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         value: '',
      };
    };

 handleChange(event) {
        this.setState({value: event.target.value});
     }
render() {
return (
  <div className="message_wrap" key={this.props.message_id}>
                                <div className="message_body">
                                       {this.props.message_body}
                                </div>            
                                 <div className="input-field col s12">
                                     <textarea value={this.state.value} ref={(ta) => {this.text = ta}}onChange={this.handleChange.bind(this)}/>
                                     <label htmlFor="textarea1">
                                         Ответ
                                     </label>
                                <button onClick={this.props.onClick}>
                                    Отправить
                                </button>
                        </div>
                    </div>
    );
  }
}
class Message extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         mes:[],
      };
    };
   componentDidMount(){
    fetch(url).then(function(response){
        return response
    }).then(function (response) {
        return response.json()
    }).then((data)=>{
        this.setState({mes:data})
    })
    }
    subFunction(user_id, i) {
           console.log(this.mesItem[i].text.value)
    }
    render() {
        return (
            <div>
            {this.state.mes.map((index, i)=>
                (
                    <MesItem
                             ref = {(ip) => {this.mesItem[i] = ip}}
                             key={index.message_id}
                             message_body={index.message_body}
                             onClick={this.subFunction.bind(this, index.user_id , i)}
                    />

                )
          )
            }
        </div>
        );
    }
}
ReactDOM.render(<Message/>, document.getElementById('container'));
