Game.Items = {};

// templates ------------------------

Game.Items.PotionHealNormal = {
  name: 'Potion of Healing',
  type: 'potion',
  character: '!',
  foreground: 'blue',
  background: 'black',

  use: function(user, target) {
    Game.HUD.setMessage(user.getName() + " uses " +
                        this.getName() + " on " + target.getName());
    target.modHP(10);
  }
}

Game.Items.PotionAcidNormal = {
  name: 'Potion of Acid',
  type: 'potion',
  character: '!',
  foreground: 'red',
  background: 'black',

  use: function(user, target) {
    Game.HUD.setMessage(user.getName() + " drinks a " +
                        this.getName() + ". It burns!");
    target.modHP(-5);
  }
}