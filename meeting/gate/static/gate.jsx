// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

// tutorial4.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
      </div>
    );
  }
});

// tutorial19.js
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

// Gate

var ProductBox = React.createClass({
  render: function () {
    if (this.props.access.customer) {
      return (
        <table>
          <tbody>
            <tr>
              <th>Produto</th>
              <td>{this.props.access.customer.product_name}</td>
            </tr>
            <tr>
              <th>Comprador</th>
              <td>{this.props.access.customer.buyer_name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{this.props.access.customer.buyer_email}</td>
            </tr>
          </tbody>
        </table>
      );
    }
    else
      return false;
  }
})

function WristbandStatus(props) {
  return (
    <div>
      {props.access.wristband_code ?
        <div className="alert alert-dismissible alert-danger">
          <strong>Atenção!</strong>
          <p>
            <strong>{props.access.customer.buyer_name}</strong>
            entrou em
            <em>{props.access.entry_on}</em>
            usando
            <strong>{props.access.customer.product_name}</strong>
          </p>
        </div>
       :
        <div className="alert alert-dismissible alert-success">
          <button type="button" className="close" data-dismiss="alert">&times;</button>
          <strong>Pronto!</strong>
          Aperte <strong>Enter</strong> para confirmar a entrada.
        </div>
      }
    </div>
  );
}

function Input(props) {
  var className = "form-group";

  if (props.has)
    className += " has-" + props.has;

  return (
    <div className={className}>
      <label className="control-label">{props.label}</label>
      <input type="text" readOnly className="form-control" id=""
             value={props.value} placeholder={props.placeholder} />
    </div>
  );
}

function InputSuccess(props) {
  return (
    <div className="form-group has-success">
      <label className="control-label">{props.label}</label>
      <input type="text" readOnly className="form-control" id="" value={props.value} />
    </div>
  );
}

function InputError(props) {
  return (
    <div className="form-group has-error">
      <label className="control-label" htmlFor="">{props.label}</label>
      <input type="text" readOnly className="form-control" id="" value={props.value} />
    </div>
  );
}

function ReadQRCodeMsg(props) {
  return (

    <div className="alert alert-dismissible alert-info">
      <h4>QRCODE!</h4>
      <p>
        Por favor, utilize o <strong>Scan</strong> no <strong>QRCode</strong>.
      </p>
    </div>

  );
}

class QRCodeBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    // this.load_access = this.load_access.bind(this);
  }

  // componentDidMount() {
  //   // __input_reader
  // }

  componentWillMount() {
    if (this.props.qrcode)
      this.load_access(this.props.qrcode);
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.qrcode) && (this.props.qrcode != prevProps.qrcode))
      this.load_access(this.props.qrcode);
  }

  load_access() {
    var self = this;
    var url = "/api/ʋ666/qrcode/" + this.props.qrcode;
    $.get(url, 'json').done(function (data) {

      self.setState({access: data})

      // Access should be valid if doesn't have wristband code
      this.setState({qrcode_valid: data.wristband_code == null});

    }).fail(function (xhr) {
      if (xhr.status == 404) {
        __input_reader.input.qrcode = null;
        __input_reader.render();
      }
    });
  }

  render() {
    if (this.state.access) {
      return (
        <div>

          <InputSuccess label="QRCode" value={this.props.qrcode} />

          <Customer customer={this.state.access.customer} />

          <Guest guest={this.state.access.guest} />

          <WristbandStatus access={this.state.access} />

        </div>
      );
    }
    else
      return null;
  }

}

class WristbandBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   // __input_reader
  // }

  componentWillMount() {
    if (this.props.wristband)
      this.load_wristband(this.props.wristband);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.wristband != prevProps.wristband)
      this.load_wristband(this.props.wristband);
  }

  load_wristband() {
    var self = this;
    var url = "/api/ʋ666/wristband/" + this.props.wristband;
    $.get(url, 'json').done(function (data) {

      self.setState({wristband: data})

    }).fail(function (xhr) {

      // Wristband should be valid if fail (404)
      __input_reader.input.wristband_valid = xhr.status == 404;

    });
  }

  render() {
    if (this.state.wristband) {
      return (
        <div>

          { this.state.wristband.wristband_code ?
            <InputError label="Pulseira" value={this.props.wristband} />
            :
            <InputSuccess label="Pulseira" value={this.props.wristband} />
          }

        </div>
      );
    }
    else {
      return (
        <div>
          {this.props.wristband ?
            <p>

              Pulseira {this.props.wristband} disponível

              <br />

              <b>Aperte Enter para confirmar entrada</b>

            </p>
          :

            <div className="alert alert-dismissible alert-info">
              <h4>PULSEIRA!</h4>
              <p>
                Aproxime a <strong>Pulseira</strong> do <strong>Leitor</strong>.
              </p>
            </div>

          }
        </div>
      );
    }
  }
}

class Gate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   this.load_access();
  // }

  // load_access() {
  //   var self = this;
  //   var url = "/api/access/" + this.props.qrcode;
  //   $.ajax({
  //     url: url,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data) {
  //       console.debug('data', data);
  //       self.setState({access: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // }

  render() {

    return (
      <div>

        <QRCodeBox qrcode={this.props.qrcode} />

        <WristbandBox wristband={this.props.wristband} />

      </div>
    );
  }

}

function Alert(props) {
  var className ="alert alert-dismissible alert-" + props.alert;
  return (

    <div className={className}>
      <h4>{props.title}</h4>
      <p>
        {props.message}
      </p>
    </div>

  );
}

class SubmitEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  handle_click(e) {

  }

  render() {
    return (
      <div>
        <a href="#" className="btn btn-primary btn-lg">Large button</a>
      </div>
    );
  }

}

function Customer(props) {

  if (props.access.customer)
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">
            <p>{props.access.customer.product_name}</p>
          </h3>
        </div>
        <div className="panel-body">
          <p>
            {props.access.customer.buyer_name}
          </p>
          <p>
            {props.access.customer.buyer_email}
          </p>
        </div>
      </div>
    );
  else
    return null;
}

function Guest(props) {
  if (props.access.guest)
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            <p>CONVIDADO</p>
          </h3>
        </div>
        <div className="panel-body">
          <p>
            {props.access.guest.name}
          </p>
          <p>
            Documento: {props.access.guest.document}
          </p>
          <p>Observação:</p>
          <blockquote>{props.access.guest.note}</blockquote>
        </div>
      </div>
    );
  else
    return null;
}

class Content extends React.Component {

  constructor(props) {
    super(props);
    this.set_default_display();
  }

  componentWillMount() {

    if (this.props.wristband)
      this.load_wristband(this.props.wristband);

    if (this.props.qrcode)
      this.load_access(this.props.qrcode);

  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.wristband != prevProps.wristband)
      this.load_wristband(this.props.wristband);

    if ((this.props.qrcode) && (this.props.qrcode != prevProps.qrcode))
      this.load_access(this.props.qrcode);

  }

  ask() {

    if ((this.state.qrcode_valid) && (this.state.wristband_valid)) {
      if (confirm("Aperte ENTER para confirmar a entrada:")) {
        var url = "/api/ʋ666/entry/" + this.props.qrcode + "/";
        var params = {wristband_code: this.props.wristband};

        $.ajax({
          type: "PUT",
          url: url,
          data: params,
          headers: {
            'X-CSRFToken': getCookie('csrftoken')
          },
          success: function (data) {
            alert("Entrada CONFIRMADA");
            __input_reader.destroy().init();
          },
          dataType: 'json'
        });

      }
      else {
        __input_reader.destroy().init();
      }
    }

    // __input_reader.input.qrcode = null;
    // __input_reader.input.wristband = null;

    // this.set_default_display();
    // this.setState({
    //     qrcode_valid: false,
    //     wristband_valid: false,
    //     qrcode: null,
    //     wristband: null
    // });

  }

  set_default_display() {
    this.state = {
      qrcode_input: {
        has: 'warning',
        placeholder: "Faça a leitura do QRCode !"
      },
      wristband_input: {
        has: 'warning',
        placeholder: "Faça a leitura da Pulseira !"
      }
    };
  }

  set_qrcode_display(data, xhr) {
    var has = 'success';
    var placeholder = "Faça a leitura do QRCode !";

    if (data) {
      if (data.wristband_code) {
        has = 'error';
        this.setState({
          qrcode_alert: {
            alert: 'danger',
            title: 'QRCODE!',
            message: 'Este QRCode já foi usado às ' + data.entry_on + ' !'
          }
        });
      }
    }
    else if (xhr) {
      if (xhr.status == 404)
        has = 'error';
        this.setState({
          qrcode_alert: {
            alert: 'danger',
            title: 'QRCODE!',
            message: 'Este QRCode não consta no nosso sistema !'
          }
        });
    }

    this.setState({
      qrcode_input: {
        has: has,
        placeholder: placeholder
      }
    });

  }

  load_access() {
    var self = this;
    var url = "/api/ʋ666/qrcode/" + this.props.qrcode;

    self.setState({
      qrcode_alert: null
    });

    $.get(url, 'json').done(function (data) {

      // Access should be valid if doesn't have wristband code
      self.setState({qrcode_valid: data.wristband_code == null});

      self.set_qrcode_display(data);

      self.setState({
        access: data
      })

      self.ask();

    }).fail(function (xhr) {
      self.set_qrcode_display(null, xhr);
      if (xhr.status == 404) {
        self.setState({
          access: null
        });
        __input_reader.input.qrcode = null;
        __input_reader.render();
      }
    });
  }

  set_wristband_display(data, xhr) {
    var has = 'success';
    var placeholder = "Faça a leitura da Pulseira !";

    if (data) {
      has = 'error';
      this.setState({
        wristband_alert: {
          alert: 'danger',
          title: 'Pulseira!',
          message: 'Esta Pulseira já foi usado às ' + data.entry_on + ' !'
        }
      });
    }
    else if (xhr) {
      // if (xhr.status == 404) {

      // }
    }

    this.setState({
      wristband_input: {
        has: has,
        placeholder: placeholder
      }
    });

  }

  load_wristband() {
    var self = this;
    var url = "/api/wristband/" + this.props.wristband;

    self.setState({
      wristband_alert: null
    });

    $.get(url, 'json').done(function (data) {

      self.setState({wristband: data})
      self.set_wristband_display(data);

    }).fail(function (xhr) {

      // Wristband should be valid if fail (404)
      self.setState({wristband_valid: xhr.status == 404});

      self.ask();

      self.set_wristband_display(null, xhr);

    });
  }

  render() {
    return (
      <div>

        <Input
          has={this.state.qrcode_input.has}
          label="QRCode"
          value={this.props.qrcode}
          placeholder={this.state.qrcode_input.placeholder} />

        { this.state.qrcode_alert ?
            <Alert alert={this.state.qrcode_alert.alert}
              title={this.state.qrcode_alert.title}
              message={this.state.qrcode_alert.message} />
          :
          null
        }

        { (!this.state.qrcode_alert) && (this.state.access) ?
            <div>
              <Customer access={this.state.access} />
              <Guest access={this.state.access} />
            </div>
          :
          null
        }

        <Input
          has={this.state.wristband_input.has}
          label="Pulseira"
          value={this.props.wristband}
          placeholder={this.state.wristband_input.placeholder} />

        { this.state.wristband_alert ?
            <Alert alert={this.state.wristband_alert.alert}
              title={this.state.wristband_alert.title}
              message={this.state.wristband_alert.message} />
          :
          null
        }

        { this.state.wristband_alert ?
            <Alert alert={this.state.wristband_alert.alert}
              title={this.state.wristband_alert.title}
              message={this.state.wristband_alert.message} />
          :
          null
        }

      </div>
    );
  }

}

$(function () {

  var window_focus;

  // $(window).focus(function() {
  //     window_focus = true;
  //     // console.debug("window_focus", window_focus);
  // }).blur(function() {
  //   window_focus = false;
  //     // console.debug("window_focus", window_focus);
  //   $(window).focus();
  // });

  $(window).focus();

  var app = {
    input: {},

    init: function () {
      var line = '';
      document.onkeyup = function (e) {
        var chr = String.fromCharCode(e.which);

        if (e.code == "Enter") {
          // NOTE: For some reason the "-" minus character from the qrcode
          // reader comes 1/4 character
          line = line.replace(/[^a-zA-Z0-9]/g,'-')
          // NOTE: Ensure is lower case (qrcode reader isn't reading as lower)
          line = line.toLowerCase();
          app.process_line(line);
          line = '';
        }
        else {
          line += chr;
        }

      };
      this.render();
      return this;
    },

    process_line: function (line) {

      // console.debug("line", line);
      // console.debug("length", line.length);

      if (is_wristband(line)) {
        this.input.wristband = line;
      }
      else if (is_ticket_qrcode(line)) {
        this.input.qrcode = line;
      }

      // if (this.input.qrcode) {
      //   this.render();
      // }

      // if (this.input.wristband) {
      //   this.render();
      // }

      this.render();

      // if (this.line == '') {
      //   this.render();
      // }

      // console.debug("input", this.input);

    },

    destroy: function () {
      this.input = {};
      $("#content").html("");
      return this;
    },

    render: function () {
      // console.debug('render input', this.input);
      ReactDOM.render(
        <Content qrcode={this.input.qrcode} wristband={this.input.wristband} />,
        document.getElementById('content')
      );
    },

  };

  window.__input_reader = app.init();

  // __input_reader.process_line("a");

  // __input_reader.process_line("ab");

});

