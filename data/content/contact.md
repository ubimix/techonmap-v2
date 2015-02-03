title: <i class="icon icon-info"></i>Contact form
----
<form action="/back/send" enctype="application/x-www-form-urlencoded"
        method="POST">
  <div class="form-group">
    <label for="user-name">Votre nom</label>
    <input name="name" placeholder="Votre nom" id="user-name" name="name" />
  </div>
  <div class="form-group">
    <label for="user-email">Votre e-mail adresse</label>
    <input type="email" class="form-control" id="user-email" name="email" placeholder="Votre e-mail adresse">
  </div>
  <div class="form-group">
    <label for="reason">Choisissez une raison</label>
    <select name="reason" id="reason">
        <option>Choisissez une raison</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
    </select>
  </div>
  <div class="form-group">
    <label for="content">Votre message</label>
    <textarea name="content" id="content" placeholder="Votre message" rows="10"
                    cols="80"></textarea>
  </div>
  <button type="submit" class="btn btn-default">Envoyer</button>
</form>