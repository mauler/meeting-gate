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

class MessageCode extends React.Component {
  render() {
    return (
      <small>#{this.props.code}</small>
    );
  }
}

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
        <MessageCode code="QRCODE_REQUIRES_IDENTIFICATION" />
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
    this.setState({placeholder: ''});
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
            onBlur={this.props.onBlur}
            ref={(input) => { this.inputElement = input; }}
            type="text"
            className="form-control"
            name={this.props.input_name}
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
    this.state = {};
  }

  setInfo(info={}) {
    // window.console.trace(info);
    this.setState({info: info});
    if (info) {
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
  }

  render() {
    return (
      <div>

        { this.state.info ?
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
                      <span style={{'fontSize': '48px'}} className="glyphicon glyphicon-tent" aria-hidden="true"></span>
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

class WBandInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setInfo(info={}) {
    this.setState({info: info});
    if (info) {
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
  }

  render() {

    return (
      <div>

        { this.state.info ?
            <div>
              { (! this.state.info.entry_on) ?
                <p></p>
                :
                null
              }
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

    if (message_code == 'QRCODE_VALID') {
      this.setState({
        code: message_code,
        alert: 'success',
        title: 'QRCode válido!',
        message: 'QRCOde válido, siga as instruções.'
      });
    }
    else if (message_code == 'WRISTBAND_ALREADY_USED') {
      this.setState({
        code: message_code,
        alert: 'danger',
        title: 'Pulseira já foi usada!',
        message: 'Esta puĺseira já foi usada anteriormente.'
      });
    }
    else if (message_code == 'QRCODE_NOT_FOUND') {
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
          <MessageCode code={this.state.code} />
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
    this.inputOnBlur = this.inputOnBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.check_qrcode_found = this.check_qrcode_found.bind(this);
    this.check_qrcode_not_found = this.check_qrcode_not_found.bind(this);
    this.check_wband_found = this.check_wband_found.bind(this);
    this.check_wband_not_found = this.check_wband_not_found.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    this.qrcodeInput.inputElement.focus();
    this.qrcodeMessage.setState({code: this.props.code});
  }

  clear() {
    this.wbandInput.reset();
    this.qrcodeInput.reset();
    this.qrcodeInfo.setInfo(null);
    this.qrcodeMessage.setCode(null);
    this.qrcodeInput.inputElement.focus();
  }

  confirm() {
    var self = this;
    if ((! this.qrcodeInfo.state.info.entry_on) &&
        (! this.wbandInfo.state.info.entry_on)) {
      if (confirm("Aperte ENTER para confirmar a entrada:")) {
        var url = "/api/ʋ666/entry/" + this.qrcodeInput.inputElement.value + '/';
        var params = {wristband_code: this.wbandInput.inputElement.value};
        $.ajax({
          type: "PUT",
          url: url,
          data: params,
          headers: {
            'X-CSRFToken': getCookie('csrftoken')
          },
          success: function (data) {
            alert("Entrada CONFIRMADA");
            self.clear();
          },
          dataType: 'json'
        });
      }
      else {
        self.clear();
      }
    }
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
      this.qrcodeMessage.setCode('QRCODE_VALID');
      this.wbandInput.inputElement.focus();
    }
    else {
      this.clear();
      this.qrcodeInput.setError();
      this.qrcodeMessage.setCode('QRCODE_ALREADY_USED');
    }

    this.qrcodeInfo.setInfo(data);
  }

  check_qrcode(success_callback, fail_callback) {
    this.qrcodeInfo.setState({data: {uuid: this.qrcodeInput.inputElement.value}});
    var url = GATE_API_URL + "/qrcode/" + this.qrcodeInput.inputElement.value;
    $.get(url, 'json').done(this.check_qrcode_found).fail(this.check_qrcode_not_found);
  }

  check_wband_not_found(xhr) {
    if (xhr.status == 404) {
      this.wbandInput.setSuccess();
      this.wbandMessage.setCode(null);
      this.wbandInfo.setInfo({wristband_code: this.wbandInput.inputElement.value});
      this.wbandInput.setState({placeholder: null});
      setTimeout(this.confirm, 100);
    }
  }

  check_wband_found(data) {
    this.wbandInput.setError();
    this.wbandMessage.setCode('WRISTBAND_ALREADY_USED');
    this.wbandInfo.setInfo(data);
    this.wbandInput.setState({
      placeholder: this.wbandInput.inputElement.value});
    this.wbandInput.inputElement.value = '';
  }

  check_wband(success_callback, fail_callback) {
    this.wbandInfo.setState({data: {wristband_code: this.wbandInput.inputElement.value}});
    var url = GATE_API_URL + "/wristband/" + this.wbandInput.inputElement.value;
    $.get(url, 'json')
      .done(this.check_wband_found)
      .fail(this.check_wband_not_found);
  }

  inputOnBlur (e) {
    if (document.hasFocus()) {
      if (e.target == this.qrcodeInput.inputElement) {
        if (e.target.value == '') {
          e.target.focus();
        }
        else {
          this.check_qrcode();
        }
      }
      else if (e.target == this.wbandInput.inputElement) {
        if (e.target.value == '') {
          this.clear();
        }
        else {
          this.check_wband();
        }
      }
    }
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
        this.check_wband();
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

          <p>
            Para recomeçar a leitura: <kbd>BACKSPACE</kbd>
          </p>

          <Input
            onBlur={this.inputOnBlur}
            input_icon="qrcode"
            input_id="id_qrcode"
            input_name="qrcode"
            label="QRCode"
            ref={(input) => { this.qrcodeInput = input; }}
            />

          <QRCodeInfo
            ref={(info) => { this.qrcodeInfo = info; }}
            />

          <Message
            ref={(message) => { this.qrcodeMessage = message; }}
            />

          <Input
            onBlur={this.inputOnBlur}
            input_icon="user"
            input_id="id_wristband"
            input_name="wristband"
            label="Wristband"
            ref={(input) => { this.wbandInput = input; }}
            />

          <WBandInfo
            ref={(info) => { this.wbandInfo = info; }}
            />

          <Message
            ref={(message) => { this.wbandMessage = message; }}
            />

            <a href="#">
              {/*This element is here to handle TAB on the second input -->*/}
            </a>

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

$(function () {

  window.__gate_app = GateApp.init();

});

