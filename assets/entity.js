Game.Entity = function(properties) {
  properties = properties || {};  
  Game.Glyph.call(this, properties);
  
  this._name = properties['name'] || '';
  this._x = properties['x'] || 0;
  this._y = properties['y'] || 0;
  this._map = null;

  this._hpMax = this._hp = properties['hp'] || 10;
  this._atkMax = properties['atkMax'] || 5;
  this._atkMin = properties['atkMin'] || 1;
  this._ac = properties['ac'] || 5;

  this._attachedMixins = {};
  this._attachedMixinGroups = {};

  var mixins = properties['mixins'] || [];

  // copy all properties for all mixins except name and init properties
  for (var i = 0; i < mixins.length; i++) {
    for (var key in mixins[i]) {
      if (key != 'init' && key != 'name' && !this.hasOwnProperty(key)) {
        this[key] = mixins[i][key];
      }
    }

    // add mixin name to list of attached mixins
    this._attachedMixins[mixins[i].name] = true;

    if (mixins[i].groupName) {
      this._attachedMixinGroups[mixins[i].groupName] = true;
    }

    // call mixin init, if it exists
    if (mixins[i].init) {
      mixins[i].init.call(this, properties);
    }
  }
}

Game.Entity.extend(Game.Glyph);

Game.Entity.prototype.hasMixin = function(obj) {
  if (typeof obj === 'object') {
    return this._attachedMixins[obj.name];
  } else {
    return this._attachedMixins[obj] || this._attachedMixinGroups[obj];
  }
}

Game.Entity.prototype.setName = function(name) {
  this._name = name;
}
Game.Entity.prototype.setX = function(x) {
  this._x = x;
}
Game.Entity.prototype.setY = function(y) {
  this._y = y;
}
Game.Entity.prototype.getName = function() {
  return this._name;
}
Game.Entity.prototype.getX = function() {
  return this._x;
}
Game.Entity.prototype.getY   = function() {
  return this._y;
}

Game.Entity.prototype.setMap = function(map) {
  this._map = map;
}

Game.Entity.prototype.getMap = function() {
  return this._map;
}

Game.Entity.prototype.getHP = function() {
  return this._hp;
}

Game.Entity.prototype.getHPMax = function() {
  return this._hpMax;
}

Game.Entity.prototype.modHP = function(amt) {
  this._hp += amt;
  if (this._hp > this._hpMax) {
    this._hp = this._hpMax;
  } 
}

Game.Entity.prototype.die = function(killer) {
  
}