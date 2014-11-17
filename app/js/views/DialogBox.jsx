    <div className="modal fade in" tabindex="-1" role="dialog">
        <div className="modal-backdrop fade in"></div>
        <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                <h4 className="modal-title" id="exampleModalLabel">New message to @twbootstrap</h4>
              </div>
              <div className="modal-body">
                <form role="form">
                  <div className="form-group">
                    <label for="recipient-name" className="control-label">Recipient:</label>
                    <input type="text" className="form-control" id="recipient-name">
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="control-label">Message:</label>
                    <textarea className="form-control" id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Send message</button>
              </div>
            </div>
        </div>
    </div>