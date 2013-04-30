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