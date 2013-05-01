Game.Actor = function(properties) {
  properties = properties || {};    
  Game.Entity.call(this, properties);

  this._type = 'actor';
  this._hpMax = this._hp = properties['hp'] || 10;
  this._atkMax = properties['atkMax'] || 5;
  this._atkMin = properties['atkMin'] || 1;
  this._ac = properties['ac'] || 5;  
}

Game.Actor.extend(Game.Entity);

Game.Actor.prototype.getHP = function() {
  return this._hp;
}

Game.Actor.prototype.getHPMax = function() {
  return this._hpMax;
}

Game.Actor.prototype.modHP = function(amt) {
  this._hp += amt;
  if (this._hp > this._hpMax) {
    this._hp = this._hpMax;
  } 
}

Game.Actor.prototype.die = function(killer) {
  
}