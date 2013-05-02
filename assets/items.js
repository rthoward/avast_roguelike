Game.Items = {};

// templates ------------------------

Game.Items.PotionHealNormal = {
  name: 'Potion of Healing',
  type: 'potion',
  uses: ['quaff', 'throw'],
  character: '!',
  foreground: 'blue',
  background: 'black',

  use: function(user, target) {
    Game.HUD.queueMessage(user.getName() + " feels better.");
    target.modHP(10);
  }
}

Game.Items.PotionAcidNormal = {
  name: 'Potion of Acid',
  type: 'potion',
  uses: ['quaff', 'throw'],
  character: '!',
  foreground: 'red',
  background: 'black',

  use: function(user, target) {
    Game.HUD.queueMessage(user.getName() + " drinks a " +
                        this.getName() + ". It burns!");
    target.modHP(-5);
  }
}