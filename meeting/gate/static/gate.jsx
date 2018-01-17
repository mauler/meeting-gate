var GateApp = {

  init: function () {
    this.render();
    return this;
  },

  render: function () {
    ReactDOM.render(
      <Gate />,
      document.getElementById('content')
    );
  },

};

class RequiresIDInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="alert alert-danger" role="alert">
          <p>
            <strong>ATENÇÃO!</strong>
            <br />
            Favor conferir os <strong>DOCUMENTOS</strong>:
          </p>
        </div>
        <dl className="">
          <dt>Nome Completo</dt>
          <dd>{this.props.info.guest_ticket.person_name}</dd>
          <dt>Documento (CPF ou RG)</dt>
          <dd>{this.props.info.guest_ticket.person_document}</dd>
        </dl>
      </div>
    );
  }
}

class GuestTicketInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3>{this.props.info.guest_ticket.person_name} <small>convidado da lista: <strong>{this.props.info.guest_ticket.list_name}</strong></small></h3>
        </div>
      </div>
    );
  }
}

class WebTicketInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3>{this.props.info.web_ticket.product_name} <small>comprado por <strong>{this.props.info.web_ticket.buyer_name}</strong> <u>{this.props.info.web_ticket.buyer_email}</u></small></h3>
        </div>
        { (! this.props.info.entry_on) ?
          <div>
            <h4>Instruções</h4>
            <ol>
              <li>Aproxime uma nova pulseira.</li>
              <li>Confirme a entrada.</li>
            </ol>
          </div>
          : null
        }
      </div>
    );
  }
}

class PaperTicketInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3>Ticket de Papel <small>{this.props.info.paper_ticket.batch_name} #{this.props.info.paper_ticket.batch_line}</small></h3>
        </div>
        { (! this.props.info.entry_on) ?
          <div>
            <h4>Instruções</h4>
            <ol>
              <li>Destaque o canhoto.</li>
              <li>Guarde o canhoto.</li>
              <li>Aproxime uma nova pulseira.</li>
              <li>Confirme a entrada.</li>
            </ol>
          </div>
          : null
        }
      </div>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      className: 'form-group',
      status: null,
      icon: null};
    this.input_status_id = props.input_id + '-Status';
    this.input_icon_class_name = "glyphicon glyphicon-" + props.input_icon;
  }

  componentDidMount() {

    if (this.props.icon)
      this.setIcon(this.props.icon);

    if (this.props.status)
      this.setStatus(this.props.status);

  }

  reset() {
    this.inputElement.value = '';
    this.setStatus(null);
    this.setIcon(null);
  }

  setIcon(icon) {
    this.setState({
      iconClassName: 'glyphicon form-control-feedback glyphicon-' + icon,
      icon: icon,
    })
  }

  setStatus(status) {
    this.setState({
      className: 'form-group has-feedback has-' + status,
      status: status,
    })
  }

  setSuccess() {
    this.setStatus('success');
    this.setIcon('ok');
  }

  setWarning() {
    this.setStatus('warning');
    this.setIcon('warning-sign');
  }

  setError() {
    this.setStatus('error');
    this.setIcon('remove');
  }

  render() {
    return (
      <div className={this.state.className}>
        <label className="control-label" htmlFor={this.props.input_id}>{this.props.label}</label>
        <div className="input-group">
          <span className="input-group-addon">

          <span className={this.input_icon_class_name} aria-hidden="true"></span>

          </span>
          <input
            ref={(input) => { this.inputElement = input; }}
            type="text"
            className="form-control"
            id={this.props.input_id}
            aria-describedby={this.input_status_id}
            placeholder={this.state.placeholder}
            />
        </div>
        <span
          className={this.state.iconClassName}
          aria-hidden="true"></span>
        <span id={this.input_status_id} className="sr-only">{this.state.status}</span>
      </div>
    );
  }
}

class QRCodeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {info: {}};
  }

  setInfo(info={}) {
    this.setState({info: info});
    if (info.entry_on) {
      this.setState({row_qrcode_classname: 'danger'});
    }
    else if ((! info.web_ticket) && (! info.guest_ticket) && (! info.paper_ticket)) {
      this.setState({row_qrcode_classname: 'warning'});
    }
    else {
      this.setState({row_qrcode_classname: 'success'});
    }
  }

  render() {
    return (
      <div>

        { this.state.info.uuid ?
          <div className="jumbotron">
            <h2>Informações do QRCode</h2>
            <table className="table table-bordered table-striped">
              <tbody>
                <tr className={this.state.row_qrcode_classname}>
                  <th>
                    <span style={{'fontSize': '48px'}} className="glyphicon glyphicon-qrcode" aria-hidden="true"></span>
                  </th>
                  <td>
                    <p>
                      <strong>
                        {this.state.info.uuid}
                      </strong>
                    </p>
                  </td>
                </tr>
                { this.state.info.entry_on ?
                  <tr>
                    <th>
                      <span style={{fontSize: '48px'}} className="glyphicon glyphicon-tent" aria-hidden="true"></span>
                    </th>
                    <td>
                      <p>
                      Este <strong>QRCode</strong> já foi usado em <strong>{this.state.info.entry_on}</strong>
                      </p>
                    </td>
                  </tr>
                  :
                  null
                }
              </tbody>
            </table>

            { this.state.info.qrcode_requires_identification ?
              <RequiresIDInfo info={this.state.info} />
              :
              null
            }

            { this.state.info.paper_ticket ?

              <PaperTicketInfo info={this.state.info} />

              : null}

            { this.state.info.web_ticket ?

              <WebTicketInfo info={this.state.info} />

              : null}

            { this.state.info.guest_ticket ?

              <GuestTicketInfo info={this.state.info} />

              : null}



          </div>
          :
          null
        }
      </div>
    );
  }
}

class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setCode(this.props.code);
  }

  setCode(message_code, ) {

    if (message_code == 'QRCODE_NOT_FOUND') {
      this.setState({
        code: message_code,
        alert: 'warning',
        title: 'QRCODE não encontrado!',
        message: 'Este QRCODE não se encontra em nosso banco de dados.'
      });
    }
    else if (message_code == 'QRCODE_ALREADY_USED') {
      this.setState({
        code: message_code,
        alert: 'danger',
        title: 'QRCODE já foi usado!',
        message: 'Este QRCODE já foi usado anteriormente, verifique acima as informações.'
      });
    }
    else {
      this.setState({code: null});
    }

  }

  render() {
    if (this.state.code) {
      var className ="alert alert-dismissible alert-" + this.state.alert;
      return (
        <div className={className}>
          <h4>{this.state.title}</h4>
          <p>
            {this.state.message}
          </p>
          <strong>{this.state.code}</strong>
        </div>
      );
    }
    return null;
  }
}

class Gate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcode: null,
      wristband: null
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.check_qrcode_found = this.check_qrcode_found.bind(this);
    this.check_qrcode_not_found = this.check_qrcode_not_found.bind(this);
  }

  componentDidMount() {
    this.qrcodeInput.inputElement.focus();
    this.qrcodeMessage.setState({code: this.props.code});
  }

  clear() {
    this.wbandInput.reset();
    this.qrcodeInput.reset();
    this.qrcodeInfo.setInfo();
    this.qrcodeMessage.setCode(null);
    this.qrcodeInput.inputElement.focus();
  }

  check_qrcode_not_found(xhr) {
    if (xhr.status == 404) {
      this.qrcodeInfo.setInfo({uuid: this.qrcodeInput.inputElement.value});
      this.qrcodeMessage.setCode('QRCODE_NOT_FOUND');
      this.qrcodeInput.setState({
        placeholder: this.qrcodeInput.inputElement.value});
      this.qrcodeInput.inputElement.value = '';
      this.qrcodeInput.setWarning();
    }
  }

  check_qrcode_found(data) {
    if (! data.wristband_code) {
      this.qrcodeInput.setSuccess();
      this.qrcodeMessage.setCode(null);
      this.wbandInput.inputElement.focus();
    }
    else {
      this.qrcodeInput.setState({
        placeholder: this.wbandInput.inputElement.value});
      // this.wbandInput.inputElement.value = '';
      this.clear();
      this.qrcodeInput.setError();
      this.qrcodeMessage.setCode('QRCODE_ALREADY_USED');
    }

    this.qrcodeInfo.setInfo(data);
    // self.ask();
  }

  check_qrcode(success_callback, fail_callback) {
    this.qrcodeInfo.setState({data: {uuid: this.qrcodeInput.inputElement.value}});
    var url = GATE_API_URL + "/qrcode/" + this.qrcodeInput.inputElement.value;
    $.get(url, 'json').done(this.check_qrcode_found).fail(this.check_qrcode_not_found);
  }

  onKeyUp (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      e.preventDefault();
      if ((e.target == this.qrcodeInput.inputElement) &&
          (this.qrcodeInput.inputElement.value != '')) {
        // check qrcode
        this.check_qrcode();
      }
      if ((e.target == this.wbandInput.inputElement) &&
          (this.wbandInput.inputElement.value != '')) {
        // check wristband
      }
    }
    else if (code == 8) {
      e.preventDefault();
      this.clear();
    }
  }

  render () {
    return (
        <div
            ref={(form) => { this.formElement = form; }}
            onKeyUp={this.onKeyUp}>

          <Input
            input_icon="qrcode"
            input_id="id_qrcode"
            label="QRCode"
            ref={(input) => { this.qrcodeInput = input; }}
            />

          <QRCodeInfo
            ref={(info) => { this.qrcodeInfo = info; }}
            />

          <Message
            ref={(message) => { this.qrcodeMessage = message; }}
            />

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
            input_icon="user"
            input_id="id_wristband"
            label="Wristband"
            ref={(input) => { this.wbandInput = input; }}
            />

        </div>
    );
  }
}

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

class OldAppContent extends React.Component {

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
        var url = GATE_API_URL + "/entry/" + this.props.qrcode + "/";
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
            __gate_app.destroy().init();
          },
          dataType: 'json'
        });

      }
      else {
        __gate_app.destroy().init();
      }
    }

    // __gate_app.input.qrcode = null;
    // __gate_app.input.wristband = null;

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
    var url = GATE_API_URL + "/wristband/" + this.props.wristband;

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


        { this.state.wristband_alert ?
            <Alert alert={this.state.wristband_alert.alert}
              title={this.state.wristband_alert.title}
              message={this.state.wristband_alert.message} />
          :
          nul
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

  window.__gate_app = GateApp.init();

});

