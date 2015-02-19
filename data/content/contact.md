title: <i class="icon icon-contact"></i>Contactez-nous
----
<form class="form-horizontal">
  <div class="form-group">
    <label for="user-name" class="col-sm-3 control-label">Votre nom</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" placeholder="Votre nom" autofocus="autofocus" id="user-name" name="name" />  
    </div>
  </div>
  <div class="form-group">
    <label for="user-email" class="col-sm-3 control-label">Votre adresse e-mail</label>
    <div class="col-sm-9">
      <input type="email" class="form-control" placeholder="Votre adresse e-mail" id="user-email" name="email" />
    </div>
  </div>
  <div class="form-group">
    <label for="reason" class="col-sm-3 control-label">Choisissez une raison</label>
    <div class="col-sm-9">
        <select class="form-control" id="reason" name="reason" placeholder="Raison de votre contact" >
            <option></option>
            <option value="technical">Question technique</option>
            <option value="data">Question sur les données</option>
            <option value="other">Autre</option>
        </select>
    </div>
  </div>
  <div class="form-group">
    <label for="content" class="col-sm-3 control-label">Votre message</label>
    <div class="col-sm-9">
      <textarea name="content" id="content"
        placeholder="Votre message"
        class="form-control"
        rows="10"
        cols="80"
        style="width:100%"></textarea>
    </div>
  </div>
</form>

